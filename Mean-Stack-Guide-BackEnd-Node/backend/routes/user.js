//Implementing login and register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

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
                error : err
            });
        });
    });
});

router.post("/api/user/login", (req,res,next) => {
    User.findOne({email : req.body.email})
        .then(user => {
            if (!user){
                return res.status(401).json({
                    message : "Auth failed"
                });
            }
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result =>{
            if (result){
                const token = jwt.sign({email:user.email,userId:user._id}, 'secret_code', {expiresIn:'1h'});

            }else {
                return res.status(401).json({
                    message : "Auth failed"
                });
            }
        })
        .catch(err => {
            return res.status(401).json({
                message : "Auth failed"
            });
        });
});

module.exports = router;