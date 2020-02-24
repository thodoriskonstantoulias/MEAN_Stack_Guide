const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    //Token will be formatted like "Bearer sakjhfdksajdfldksa" so we want the second part
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "secret_code");
        req.userData = {email: decodedToken.email, userId : decodedToken.userId};
        next();
    } catch(error) {
        res.status(401).json({
            message : 'Auth failed' 
        });
    }
};