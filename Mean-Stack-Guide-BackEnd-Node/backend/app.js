//Using Express
const express = require('express');

const app = express();

app.use('/api/posts', (req,res,next) => {
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