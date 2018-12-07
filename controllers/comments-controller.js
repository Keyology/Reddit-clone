const Comment = require('../models/comments');
const Post = require('../models/post');
const ObjectId = require('mongodb').ObjectId
const User = require('../models/user.js')

//const JSON = require('circular-json')
module.exports = (app) => {
    console.log('line:1')
    app.post("/posts/:postId/comments", (req, res) => {
        console.log('line:2')
        if (req.user) {
            console.log('line:3')
            console.log(req.body)
            const comment = new Comment(req.body);
            console.log('line:4')
            comment.author = req.user._id;
            console.log('line:5')


            //save instance of comment model to DB
            comment.save().then((comment) => {
                console.log('line:6')

                return User.findById(req.user._id)
                console.log('line:7')
            }).then(user => {
                console.log('line:8')
                console.log('in second then block ------> ' + comment);
                user.comments.unshift(comment);
                user.save();
                //this lione is throwing an error can not find postId
                return Post.findById(req.params.postId);

            }).then(post => {
                post.comments.unshift(comment)
                return post.save()
            }).then((post) => {
                console.log(comment);
                const post_id = req.params.postId
                res.redirect(`/posts/${post_id}`);
            }).catch(err => {
                console.log(err.message);
            })

        } else {
            return res.status(401).send('You need to be logged in to do that.');
        }
    });
}