var express = require('express');
var path = require('path');
var request = require('request'); // Snatches html from urls
var cheerio = require('cheerio'); // Scrapes our html
var router = express.Router();


//MODELS
var Comment = require('./models/Comment');
var Article = require('./models/Article');

router.get('/scrape', function (req, res) {
    //use request to grab the body of the html
    request('https://www.wired.com/most-popular', function (error, response, html) {

        // Load the html into cheerio and save it to a var.
        // '$' becomes a shorthand for cheerio's selector commands,
        //  much like jQuery's '$'.
        var $ = cheerio.load(html);

        // an empty array to save the data that we'll scrape
        var result = [];

        // Select each instance of the html body that you want to scrape.
        $('h2.brandon').each(function (i, element) {

            var $this = $(element);

            var result = {};

            result.title = $this.text();
            result.link = $this.parents('a').attr('href');
            result.img = $this.closest('.row').find('img').attr('src');

            var entry = new Article(result);

            // Scrape information from the web page, put it in an object
            // and add it to the result array.

            entry.save(function (err,doc) {
                if (err)
                    console.log(err);
                else
                    console.log(doc);
            });

        });

    });
    res.send('Scrape Complete');
});

router.get('/dump', function (req, res) {
    Article.remove({}, function(err) {
        res.send('Articles removed');
    });
});

router.get('/dump/comments', function (req,res) {
    Comment.remove({}, function(err) {
        res.send('Comments removed');
    })
});

router.get('/articles', function (req, res) {
    //grab all the articles
    Article.find({}, function (err, articles) {

        //object to store all articles
        var articleMap = {};

        articles.forEach(function (article) {
            articleMap[article._id] = article;
        });

        //send the articles back with the get
        res.send(articleMap);
    });
});

router.get('/articles/:id', function (req, res) {
    //save article id from get route
    var articleId = req.params.id;

    //find the article and populate the comments section
    Article.findOne({_id: articleId}).populate('comments').exec(function (err, article) {
        if (err)
            console.log(err);
        //send the article with comments back
        res.send(article);
    });

});

router.post('/articles/:id', function (req, res) {
    //create new comment with the body
    var comment = new Comment(req.body);

    // now, save that comment to the db
    comment.save(function (err, doc) {
        // log any errors
        if (err) {
            console.log(err);
        }
        // or log the doc
        else {
            console.log('doc', doc);
            var conditions = {_id: req.params.id}
                , update = {$push: {comments: doc._id}}
                , options = {new: true};

            //find the article and associate the comment to it
            Article.findOneAndUpdate(conditions, update, options, callback);

            function callback(err, data) {
                console.log('data', data);
                res.send(data);
            }

        }
    });
});


// FRONTEND ROUTES =======================
//route to handle all angular requests
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;