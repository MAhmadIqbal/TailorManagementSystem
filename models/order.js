const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product : {type : mongoose.Schema.Types.ObjectId , ref :'Product'},
    quantity : {type : Number , default : 1},
    fabricType:{type:String},
    collar:{type:String},
    length:{type:String},
    cuff:{type:String},
    pocket:{type:String},
    buttonColor:{type:String},
    delivery:{type:Date},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    totalPrice:{type:Number},
    createdAt:{type:Number,default:Date.now}
});

module.exports = mongoose.model('order' , orderSchema);