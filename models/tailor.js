const mongoose = require('mongoose')
const tailorSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:{type:String},
    address:{type:String},
    phoneNumber:{type:Number,min:11,max:11},
    shopName:{type:String}
})
module.exports = mongoose.model('tailor',tailorSchema)