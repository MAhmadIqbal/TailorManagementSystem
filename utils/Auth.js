const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt');
const {SECRET} = require('../config/app');
const jwt = require('jsonwebtoken');
const path = require('path')
const crypto = require('crypto')

const Token=require('../models/token')
//set env variables
const bcryptSalt = process.env.BCRYPT_SALT
const clientURL = process.env.CLIENT_URL
//here Functions start
const userRegistered = async(userDets,Image,role,res) =>
{
   
    //Validate the username
    try{
        let userNameNotTaken = await validateUserName(userDets.username) ;
        
        if(!userNameNotTaken){
            res.status('400').json({
                message: "Username already taken",
                success:false
            });
        }
        //Validate the email
        let emailNotRegistered = await validateEmail(userDets.email);
        if(!emailNotRegistered){
            res.status('400').json({
                message: "Email already taken"
                ,success:false
            });
        }
        //Get the hashed password
        const password = await bcrypt.hash(userDets.password,12);
        console.log(password);
        // Create new User    
        const newUser = new User({
            ... userDets,
            password ,
            role,
            Image
        });
        
        console.log(newUser);  
          newUser.save();
        return res.status(200).json({
            message:"User has been registered successfully,Please Login!",
            success:true
        });
    }catch(err){
        //Implement the blogger
        console.log(err);
        return res.status(500).json({
            message:"Unable to register your account!"
            ,success:false
        });
    }
};
// function for user login
const userlogin = async(userCreds,role,res)=>{
    let {username,password} = userCreds ;
    //Find User in the database
    const user =await User.findOne({username});
    console.log(user.role,"!Sign in");
    if(!username){
        return res.status(404).json({
            message:"User has not been found",
            success : false
        });
    }
    //Check that the user is came from the right portal
    if(user.role !== role){
        console.log(role);
        console.log("saved user role is: ",user.role);
        return res.status(404).json({
            message:"User is not login from right portal",
            success : false
        })
    }
    //if it is from the right portal and now 
    //check the password of it using bcrypt 
    const ismatch = bcrypt.compare(password,user.password);
    if(ismatch){
        //if it is matched with db passsword 
        //then sign the token and assign it to user
        let token = jwt.sign(
            {
                user_id : user._id,
                role : user.role,
                username:user.username,
                email:user.email
            },SECRET,{expiresIn:"7days"}
        );
        let result = {
            username : user.username,
            email: user.email,
            role: user.role,
            token:`Bearer${token}`,
            expiresIn : 168
        };
        return res.status(200).json({
                ... result,
                message: "Congrats! You are logged in",
                success:true,
        })

    }else{
        return res.status(403).json({
            message:"password Incorrect, UnAuthorized user",
            success : false
        })
    }
}


const validateUserName = async username =>{
   let user= await User.findOne({username})
   return user ? false:true;
}
const validateEmail = async email =>{
let user= await User.findOne({email})
    return user ? false:true;
 }
 // Forget Password
 const requestPasswordResetService = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email does not exist");
  
    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();
  
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
    
    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();
  
    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
  
    sendEmail(
      user.email,
      "Password Reset Request",
      {
        name: user.name,
        link: link,
      },
      "./template/requestResetPassword.handlebars"
    );
    return link;
  };
  //forget password by token
  const resetPasswordService = async (userId, token, password) => {
    let passwordResetToken = await Token.findOne({ userId });
  
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
  
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
  
    if (!isValid) { 
      throw new Error("Invalid or expired password reset token");
    }
  
    const hash = await bcrypt.hash(password, Number(bcryptSalt));
  
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
  
    const user = await User.findById({ _id: userId });
  
    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.name,
      },
      "./template/resetPassword.handlebars"
    );
  
    await passwordResetToken.deleteOne();
  
    return true;
  };

 module.exports={
     userlogin,
     userRegistered,
     resetPasswordService,
     requestPasswordResetService
    }