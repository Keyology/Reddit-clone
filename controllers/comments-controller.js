const Comment = require('../models/comments');
const Post = require('../models/post');
const ObjectId = require('mongodb').ObjectId
//const JSON = require('circular-json')
module.exports = (app) => {
    app.post("/posts/:postId/comments", (req, res) => {
        const comment = new Comment(req.body);
        comment
            .save()
            .then((comment) => {
                console.log('This is the id sent in the params ' + req.params.postId)
                return Post.findById(ObjectId(req.params.postId))
            })
            .then((post) => {
                console.log('This is the found post ' + post)
                // Keeping the parents ordered collection through the relationship in reverse order
                post.comments.unshift(comment) // Prepends to array of comments reverse chronological order
                return post.save() // Save the post with the newly added comments
            })
            .then((post) => {
                //console.log("this is comments:", comments)
                res.redirect('/')
            })
            .catch((err) => {
                console.log(err)
            })
    });
}