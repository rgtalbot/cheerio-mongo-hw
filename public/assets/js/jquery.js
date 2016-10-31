
// grab the articles as a json
// $.getJSON('/articles', function(data) {
//     // for each one
//     for (var i in data){
//         // display the apropos information on the page
//         $('#articles').append('<p data-id="' + data[i]._id + '">'+ data[i].title + '<br />'+ data[i].link + '</p>');
//         $('#articles').append('<p>Number of Comments: </p>');
//     }
// });




// whenever someone clicks a p tag
$(document).on('click', 'p', function(){
    // empty the notes from the note section
    $('#comments').empty();
    // save the id from the p tag
    var thisId = $(this).attr('data-id');

    // now make an ajax call for the Article
    ajaxGet(thisId);
});


function ajaxGet(articleId) {


    $.ajax({
        method: "GET",
        url: "/articles/" + articleId
    })
    // with that done, add the note information to the page
        .done(function (data) {
            console.log(data);
            // the title of the article
            $('#comments').append('<h2>New Comment</h2>');
            // an input to enter a new title
            $('#comments').append('<input id="titleinput" name="title" >');
            // a textarea to add a new note body
            $('#comments').append('<textarea id="bodyinput" name="body"></textarea>');
            // a button to submit a new note, with the id of the article saved to it
            $('#comments').append('<button data-id="' + data._id + '" id="savecomment">Save Comment</button>');

            // if there's a note in the article
            if (data.comments) {
                var comments = data.comments;

                for (var i in comments) {
                    console.log(data.comments[i]);
                    $('#comments').append('<h2>' + comments[i].title + '</h2>');
                    $('#comments').append('<span>' + comments[i].body + '</span>');
                }

            }

        });
}

// when you click the savenote button
$(document).on('click', '#savecomment', function(){
    // grab the id associated with the article from the submit button
    var thisId = $(this).attr('data-id');

    // run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $('#titleinput').val(), // value taken from title input
            body: $('#bodyinput').val() // value taken from note textarea
        }
    })
    // with that done
        .done(function( data ) {
            // log the response
            console.log('.done post data', data);
            // empty the notes section
            $('#comments').empty();
            ajaxGet(thisId);
        });

    // Also, remove the values entered in the input and textarea for note entry
    $('#titleinput').val("");
    $('#bodyinput').val("");
});














