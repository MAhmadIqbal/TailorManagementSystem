const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: {type : String, required : true},
    price: {type : Number, required : true},
    productImage : {type : String, required : true},
    category:{type:String},
    color:{type:String},
    sum:Number

    // fabricName:String,
    // fabricImage:String,
    // collarName:String,
    // collarDetail:String,
    // collarImage:String,
    // cuffName:String,
    // cuffDetails:String,
    // cuffImage:String,
    // shirtLengthName:String,
    // cuffDetails:String,
    // cuffImage:String,
});

module.exports = mongoose.model('Product' , productSchema);