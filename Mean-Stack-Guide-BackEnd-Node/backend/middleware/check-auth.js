const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    //Token will be formatted like "Bearer sakjhfdksajdfldksa" so we want the second part
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secret_code");
        next();
    } catch(error) {
        res.status(401).json({
            message : 'Auth failed'
        });
    }
    

};