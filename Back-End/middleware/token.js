const jwt=require('jsonwebtoken')
const { jwtSecret } = require("../keys")
const mongoose = require('mongoose');
const User = mongoose.model("User")


module.exports = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in" });
    }
    
    //auth=== Bearer (token) so to extract just the token we need to replace the first half
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, jwtSecret, (err, payload) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ error: "you must be logged in" });
        }
        const {_id } = payload;
        User.findById(_id).then(userdata => {
            req.User = userdata
            next();
        })
    })
}