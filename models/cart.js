const mongoose = require('mongoose')
const cartSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    categories : {type:String},
    user:{type:String,ref:'User'},
    product:{type:String,ref:'Product'},
    order:{type:String,ref:'Order'}


})
module.exports = mongoose.model('Cart',cartSchema)