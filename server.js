const express = require('express')
const bodyParser = require('body-parser')
const db = require('./data/reddit-db')
const cookieParser = require('cookie-Parser');
const jwt = require('jsonwebtoken');
const app = express()

const port = process.env.PORT || 3000



//import models

const Post = require('./models/post');
const User = require('./models/user')

require('dotenv').config();
// parse application/x-www-form-urlencoded

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}))
// parse application/json
app.use(bodyParser.json())

// Add after body parser initialization!
//app.use(expressValidator());


//imports post routes 
require('./controllers/posts.js')(app);
require('./controllers/auth.js')(app);

//import comments

require('./controllers/comments-controller.js')(app);


// set the view engine

app.set('view engine', 'ejs');


//set db

require('./data/reddit-db')






const checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        const token = req.cookies.nToken;
        const decodedToken = jwt.decode(token, {
            complete: true
        }) || {};
        req.user = decodedToken.payload;
    }

    next();
};
app.use(checkAuth);



app.listen(port, () => console.log(`listening on port ${port}`))
module.exports = app;

// <div class="lead"><%=post1.title%></div>