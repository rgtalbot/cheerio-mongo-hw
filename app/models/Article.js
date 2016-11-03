//REQUIRE MONGOOSE
var mongoose = require('mongoose');
//CHREATE SCHEMA CLASS
var Schema = mongoose.Schema;

//CREATE ARTICLE SCHEMA
var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    img: {
        type: String
    },
    //only saves one comment's ObjectId. ref refers to Comment model.
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

    });

// Create the Article model with the ArticleSchema
var Article = mongoose.model('Article', ArticleSchema);

//EXPORT
module.exports = Article;

