const Post = require('../models/post');
const User = require('../models/user.js')

module.exports = (app) => {

    app.get("/", (req, res) => {
        const currentUser = req.user;
        console.log("This is currentUser inside query:", currentUser)

        Post.find({})
            .then(post => {
                console.log("This is currentUser outside query:", currentUser)

                res.render("index", {
                    post,
                    currentUser
                });
            })
            .catch(err => {
                console.log(err.message);
            });
    })

    app.get('/posts/new', (req, res) => {
        //this route will render the the new post page
        res.render('post-new')

    })



    app.post('/posts/new', (req, res) => {
        var post = new Post(req.body);
        post.author = req.user._id;

        post
            .save()
            .then(post => {
                return User.findById(req.user._id);
            })
            .then(user => {
                user.posts.unshift(post);
                user.save();
                // REDIRECT TO THE NEW POST
                res.redirect("/posts-index" + post._id);
            })
            .catch(err => {
                console.log(err.message);
            });
    });


    app.get('/posts/:id', (req, res) => {
        const currentUser = req.user;
        //Find the post
        Post.findById(req.params.id).populate('author').populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        }).populate({
            path: 'comments',
            populate: {
                path: 'comments',
                populate: {
                    path: 'author'
                }
            }
        }).populate({
            path: 'comments',
            populate: {
                path: 'comments',
                populate: {
                    path: 'author'
                }
            }
        }).then(post => {
            res.render('post-show', {
                post,
                currentUser
            })
        }).catch(err => {
            console.log(err.message);
        })
    });

    app.get('/f/:subreddit', (req, res) => {
        Post.find({
                subreddit: req.params.subreddit
            })
            .then(post => {
                res.render('posts-index.ejs', {
                    post
                });
            }).catch(err => {
                console.log(err);
            });
    });



}