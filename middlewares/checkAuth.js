const jwt = require("jsonwebtoken");
const Token =require('../models/token')

module.exports = (req,res,next)=>{
    try{
        const token1 = req.headers.authorization.split(" ")[1];
        const decoded  =jwt.verify(token1, process.env.JWT_KEY);
        Token.find({token:token1},(err,result)=>{
            if(err) return err;
            if(result && result!='' && result != 'undefined'){
                console.log("line11/checkAuth/middleware",result)
                req.userData = decoded
                return next();
            }
            else{
                res.status(404).json({
                message : 'Token not found as login,may be Auth Failed or User has been Logout'

                })
            }
        })   
    }
    catch(error){
        return res.status(401).json({
            message : 'Auth Failed or User has been Logout'
            // res.render('/')
        })
    }
};