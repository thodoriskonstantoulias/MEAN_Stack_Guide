//Here we set up MongoDB for users
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Create schema 
const userSchema = mongoose.Schema({
    email: String,
    password : String
});

//We want the email to be unique for each user
userSchema.plugin(uniqueValidator);

//Create the model and export it 
module.exports = mongoose.model('User', userSchema);