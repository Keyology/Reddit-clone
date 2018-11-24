const express = require('express')
const bodyParser = require('body-parser')
const db = require('./data/reddit-db')
const app = express()
const port = process.env.PORT || 3000

//import models

const Post = require('./models/post');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))
// parse application/json
app.use(bodyParser.json())

// Add after body parser initialization!
//app.use(expressValidator());


//imports post routes 
require('./controllers/posts.js')(app);

//import comments

require('./controllers/comments-controller.js')(app);


// set the view engine

app.set('view engine', 'ejs');


//set db

require('./data/reddit-db')








app.listen(port, () => console.log(`listening on port ${port}`))
module.exports = app;

// <div class="lead"><%=post1.title%></div>