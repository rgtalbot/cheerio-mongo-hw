//REQUIRE MONGOOSE
var mongoose = require('mongoose');
//CHREATE SCHEMA CLASS
var Schema = mongoose.Schema;

//CREATE COMMENT SCHEMA
var CommentSchema = new Schema({

    title: {
        type: String
    },

    body: {
        type: String
    }

});

// Create the Comment model with the CommentSchema
var Comment = mongoose.model('Comment', CommentSchema);

//EXPORT
module.exports = Comment;

