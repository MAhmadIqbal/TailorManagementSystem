const mongoose =require('mongoose')
const orderPlacedSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    totalPrice:{type:Number},
    paymentMethod:String,
    shippingMethod:String,
    paymentStatus:String

})
module.exports = mongoose.model ('orderPlaced',orderPlacedSchema)