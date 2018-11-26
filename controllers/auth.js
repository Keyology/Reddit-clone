const jwt = require('jsonwebtoken');
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = (app) => {
    app.get('/sign-up', (req, res) => {
        res.render('sign-up');
    });


    app.post('/sign-up', (req, res) => {
        const user = new User(req.body);


        user.save()
            .then(user => {
                let token = jwt.sign({
                    _id: user._id
                }, process.env.SECRET, {
                    expiresIn: "60 days"
                })
                res.cookie('nToken', token, {
                    maxAge: 900000,
                    httpOnly: true
                });
                console.log(req.cookies);
                res.redirect('/');
            })
            .catch(err => {
                console.log(err.message);
                return res.status(400).send({
                    err: err
                });
            });
    });

    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    })

    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.post('/login', (req, res) => {

        const username = req.body.username; // Grab the username and password credentials
        const password = req.body.password;
        // Find this user name
        User.findOne({ // Find user by the username
                username
            }, "username password")
            .then(user => {
                if (!user) {
                    // User not found
                    return res.status(401).send({
                        message: "Wrong Username or Password"
                    });
                }
                // Check the password
                //console.log(user)
                console.log("this is the password argument:", password)
                user.comparePassword(password, (err, isMatch) => {
                    // if (err) throw err
                    console.log("Callback method error is: ", err)
                    console.log("isMatch: ", isMatch)
                    if (!isMatch) {

                        // Password does not match
                        return res.status(401).send({
                            message: "Wrong  password"
                        });
                    }
                    // Create a token
                    const token = jwt.sign({
                        _id: user._id,
                        username: user.username
                    }, process.env.SECRET, {
                        expiresIn: "60 days"
                    });
                    // Set a cookie and redirect to root
                    res.cookie("nToken", token, {
                        maxAge: 900000,
                        httpOnly: true
                    });
                    res.redirect("/");
                });
            })
            .catch(err => {
                console.log("Catch statement for compare passwords: ", err);
            });
    });




}