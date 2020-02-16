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
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");

    next();
});

//POST request
app.post("/api/posts", (req,res,next)=>{
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(result => {
        res.status(201).json({
            message: "Post added" 
        });
    });
});

//GET request
app.get('/api/posts', (req,res,next) => {
    Post.find().then(docs=>{
        res.status(200).json({
            message: "Posts fetched",
            posts: docs
        });
    });
});

app.get('/api/posts/:id', (req,res,next) => {
    Post.findById(req.params.id).then(post=>{
        if (post){
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message : 'Post not found'
            });
        }
    });
}); 

//PUT request
app.put('/api/posts/:id', (req,res,next) => {
    const post = new Post({
        _id : req.body.id,
        title : req.body.title,
        content : req.body.content
    });

    Post.updateOne({_id : req.params.id}, post).then(()=>{
        res.status(200).json({
            message : 'Post updated'
        });
    });
});

//DELETE request
app.delete('/api/posts/:id', (req,res,next) => {

    Post.deleteOne({_id:req.params.id}).then(result =>{
        console.log(result);
    });

    res.status(200).json({message:"Post deleted"});
});

module.exports = app;