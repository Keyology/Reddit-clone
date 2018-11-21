const Post = require('../models/post');

module.exports = (app) => {

    app.get('/', (req, res) => {
        //This route will render the landing page
        Post.find({}).then(post => {
            res.render('index', {
                post
            })
        }).catch(err => {
            console.log(err.message)
        })

    })

    app.get('/posts/new', (req, res) => {
        //this route will render the the new post page
        res.render('post-new')

    })



    app.post('/posts/new', (req, res) => {
        //This route will create a new post and save it to the database
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);

        // SAVE INSTANCE OF POST MODEL TO DB
        //For some reason post will not save to database
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect(`/`);
        })
    });


    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                res.render('post-show.ejs', {
                    post
                });
            })
            .catch(err => {
                console.log(err.message)
            });
    });
}