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
                        fullname:req.body.fullname,
                        email : req.body.email,
                        username:req.body.username,
                        password : hash,
                        role:req.body.role

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
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message : "Auth Failed"
                    });
                }   if(result){
                    const tokengen = jwt.sign({
                        email : user[0].email,
                        userId : user[0]._id
                        },
                        process.env.JWT_KEY,
                        {expiresIn : "1h"},
                        );
                    const tokentoSave = new Token({
                        userId : user[0]._id,
                        token:tokengen
                    })
                    tokentoSave.save().then(result=>{
                        res.json({message:"token saved"})
                        console.log("token saved")
                    }).catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            message : "Catch portion",
                            error : err
                        });
                    });
                    return res.status(200).json({
                        message : "Auth successful",
                        token : tokengen
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
    const requestPasswordReset = requestPasswordResetService(
      req.body.email
    );
    return res.json(requestPasswordReset);
  };
  
  exports.resetPassword = (req, res, next) => {
    const resetPasswordService = resetPasswordService(
      req.body.userId,
      req.body.token,
      req.body.password
    );
    return res.json(resetPasswordService);
  };
  exports.logout= (req,res,next)=>{
      user
  }
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
exports.logout = (req,res,next)=>{
    const token1 = req.headers.authorization.split(" ")[1];
    Token.remove({token:token1}).exec()
    .then(result=>{
        console.log('user logout')
        res.status(200).json({
            message:"User has been logout",
            result:result
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            message:'Internal server error',
            error:err
        })
    })
}