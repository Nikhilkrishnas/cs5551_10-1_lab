const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('../models/user');

const database = "mongodb://sumanth96:a12345678@ds045087.mlab.com:45087/lab3";

mongoose.Promise = global.Promise;
mongoose.connect(database, function (err) {
    if(err){
        console.error("Error : " + err);
    }
});

router.post('/login', function(req, res){
    console.log('login a user');
    const user_name = req.body.user_name;
    const password = req.body.password;

    user.authenticate(user_name, password, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: "User not found"});
        }
        console.log("logged in");
        return res.json({success: true, msg: "User found"});
    });
});

router.post('/register', function(req, res){
    var newUser = new user();

    newUser.user_name = req.body.user_name;
    newUser.password = req.body.password;
    newUser.email_id = req.body.email_id;

    newUser.save(function(err, insertUser){
        if(err){
            console.log("Error : " + err);
            res.json({success: false, msg: "failed to register"})
        } else {
            res.json({success: true, msg: "Successfully Registered!!!!!"});
        }
    });
});

module.exports = router;
