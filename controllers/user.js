const JWT = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;
const {resetPasswordService, requestPasswordResetService } = require('../utils/Auth')
// 
// const {
//     signup,
//     requestPasswordReset,
//     resetPassword,
//   } = require("../services/auth.service");

const mongoose = require('mongoose');
const UserRest = require('../models/usersRest');

const jwt = require('jsonwebtoken');

exports.usersSignUp = (req,res,next)=>{
    UserRest.find({email:req.body.email})
    .exec()
    .then(user=> 
    {
        if(user.length >= 1){
            res.status(409).json({
                message : "Email exists"
            });
        }else
        {
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err) {
                    return res.status(500).json({
                        error : err
                    });
                }
                else
                {
                    const user = new UserRest({
                        _id : new mongoose.Types.ObjectId(),
                        email : req.body.email,
                        password : hash
                    });
                    user.save().then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message : 'User Created',
                            createdUser:{
                                email : result.email,
                                password : result.password,
                                _id : result._id
                            } 
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error : err
                        });
                    });        
                }
            });
        }
    });
}

    exports.usersLogin = (req,res,next)=>
    {
        console.log(req.body.email)
        UserRest.find({email: req.body.email})
        .exec()
        .then(user=>
        {
            
            console.log("user find",user)
            if(user.length<1){
                return res.status(401).json({
                    message: "Auth Failed"
                });
            }
            console.log("user[0].password",user[0].password)
            console.log("req.body.password",req.body.password)
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message : "Auth Failed"
                    });
                }   if(result){
                    const token = jwt.sign({
                        email : user[0].email,
                        userId : user[0]._id
                        },
                        process.env.JWT_KEY,
                        {expiresIn : "1h"},
                        );
                    
                    return res.status(200).json({
                        message : "Auth successful",
                        token : token
                    });
                }
                res.status(401).json({
                    message : "Auth Failed"
                });
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                message : "Catch portion",
                error : err
            });
        });
    }
    exports.userDelete = (req,res,next)=>
    {
        UserRest.remove({_id : req.params.userId})
        .exec()
        .then(result=>{
            res.status(200).json({
                message : 'User Deleted',
                result
            });
        })
        .catch(err=>{
            res.status(500).json({
                error: err
            })
        });
    }
exports.userAll = (req,res,next)=>{
    UserRest.find()
    .exec()
        .then(result=>{
            res.status(200).json({
                message : 'Users',
                result  : result
            });
        })
}
exports.resetPasswordRequest =  (req, res, next) => {
    const requestPasswordResetService = requestPasswordReset(
      req.body.email
    );
    return res.json(requestPasswordResetService);
  };
  
  exports.resetPassword = (req, res, next) => {
    const resetPasswordService = resetPassword(
      req.body.userId,
      req.body.token,
      req.body.password
    );
    return res.json(resetPasswordService);
  };
  
    //--------------
    
  
    //------------------------
  
  
  const signUpController = async (req, res, next) => {
    const signupService = await signup(req.body);
    return res.json(signupService);
  };
  //------------------------------------

const signup = async (data) => {
  let user = await User.findOne({ email: data.email });
  if (user) {
    throw new Error("Email already exist", 422);
  }
  user = new User(data);
  const token = JWT.sign({ id: user._id }, JWTSecret);
  await user.save();

  return (data = {
    userId: user._id,
    email: user.email,
    name: user.name,
    token: token,
  });
};
  
  