//Using Express
const express = require('express');

const app = express();

app.use((req,res,next) => {
    res.send("Sending the response");
});

module.exports = app;