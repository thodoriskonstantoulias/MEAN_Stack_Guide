//Using Express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//Import routes
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

//Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/postDB", {useNewUrlParser: true, useUnifiedTopology: true})

app.use(bodyParser.json());
//Make our images public 
app.use("/images", express.static(path.join("backend/images")));

//Enable CORS
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");

    next();
});

app.use(postsRoutes);
app.use(userRoutes);

module.exports = app;