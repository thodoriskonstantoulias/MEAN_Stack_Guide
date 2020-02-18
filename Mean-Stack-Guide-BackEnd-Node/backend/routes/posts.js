const express = require('express');
const router = express.Router();

//Adding multer to understand image file
const multer = require('multer');
const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
};

//Adding MongoDB
const Post = require('../models/post');

//Multer configuration
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid){
            error = null;
        }
        cb(error, "backend/images");
    },
    filename : (req,file,cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

//POST request
router.post("/api/posts", multer(storage).single("image"), (req,res,next)=>{
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
router.get('/api/posts', (req,res,next) => {
    Post.find().then(docs=>{
        res.status(200).json({
            message: "Posts fetched",
            posts: docs
        });
    });
});

router.get('/api/posts/:id', (req,res,next) => {
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
router.put('/api/posts/:id', (req,res,next) => {
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
router.delete('/api/posts/:id', (req,res,next) => {

    Post.deleteOne({_id:req.params.id}).then(result =>{
        console.log(result);
    });

    res.status(200).json({message:"Post deleted"});
});

module.exports = router;