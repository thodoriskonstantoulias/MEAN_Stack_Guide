//Implementing login and register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post("/api/user/signup", (req,res,next) => {
    bcrypt.hash(req.body.password, 10)
       .then(hash => {
        const user = new User({
            email: req.body.email,
            password : hash
        });
        user.save().then(result => {
            res.status(201).json({
                message : 'User created',
                result : result
            });
        })
        .catch(err => {
            res.status(500).json({
                err : err
            });
        });
    });
});


module.exports = router;