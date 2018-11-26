const express = require('express')
const bodyParser = require('body-parser')
const db = require('./data/reddit-db')
const cookieParser = require('cookie-Parser');
const jwt = require('jsonwebtoken');
const app = express()

const port = process.env.PORT || 3000


const checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {

        req.user = null;
        console.log('"checkAuth if statement is running')
    } else {
        console.log('"checkAuth else statement is running')
        const token = req.cookies.nToken;
        const decodedToken = jwt.decode(token, {
            complete: true
        }) || {};
        req.user = decodedToken.payload;
    }

    next();
};


require('./data/reddit-db')

app.set('view engine', 'ejs');

//import models


const Post = require('./models/post');
const User = require('./models/user')





require('dotenv').config();

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}))
// parse application/json
app.use(bodyParser.json())
app.use(checkAuth);

require('./controllers/posts.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/comments-controller.js')(app);



app.set('view engine', 'ejs');














app.listen(port, () => console.log(`listening on port ${port}`))
module.exports = app;

// <% if (currentUser) {%>
//     <div class="alert alert-danger">
//         <% messages.forEach(function(message){ %>
//           <p><%= message %></p>
//         <% });%>
//     </div>
//    <% }%>