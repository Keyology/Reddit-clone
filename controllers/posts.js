const Post = require('../models/post');

module.exports = (app) => {

    app.get('/', (req, res) => {
        //This route will render the landing page
        res.render('index')
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



};