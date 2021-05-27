const mongoose = require('mongoose')
const tokenSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    token:{
        type:String,
        required:true,
    },
    otp:String,
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
        expires:900
    },
});
module.exports = mongoose.model("Token",tokenSchema);