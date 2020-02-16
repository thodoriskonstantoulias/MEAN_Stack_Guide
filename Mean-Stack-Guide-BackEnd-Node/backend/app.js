//Using Express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Adding MongoDB
const Post = require('./models/post');

const app = express();

//Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/postDB", {useNewUrlParser: true, useUnifiedTopology: true})

app.use(bodyParser.json());

//Enable CORS
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");

    next();
});

//POST request
app.post("/api/posts", (req,res,next)=>{
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    res.status(201).json({
        message: "Post added" 
    });
});

//GET request
app.get('/api/posts', (req,res,next) => {
    const posts = [
        {id:"sdbfgkjdsh", title: "First Title", content: "First content"},
        {id:"hfgnhtrggg", title: "Second Title", content: "Second content"}
    ];
    res.status(200).json({
        message: "Posts fetched",
        posts: posts
    });
});

module.exports = app;