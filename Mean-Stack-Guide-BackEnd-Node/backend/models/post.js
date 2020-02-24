//Here we set up MongoDB
const mongoose = require('mongoose');

//Create schema 
const postSchema = mongoose.Schema({
    title: String,
    content : String,
    imagePath: String,
    creator : {type : mongoose.Schema.Types.ObjectId,ref:"User", required:true}
});

//Create the model and export it
module.exports = mongoose.model('Post', postSchema);