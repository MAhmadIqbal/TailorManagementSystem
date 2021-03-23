const mongoose =require('mongoose')
const orderDetailsSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fabricType:{type:String},
    collar:{type:String},
    length:{type:String},
    cuff:{type:String},
    pocket:{type:String},
    buttonColor:{type:String},
    delivery:{type:Date},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    totalPrice:{type:Number}


})
module.exports = mongoose.model ('orderDetails',orderDetailsSchema)