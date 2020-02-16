//Using Express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Import routes
const postsRoutes = require('./routes/posts');

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

app.use(postsRoutes);

module.exports = app;