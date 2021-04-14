const mongoose = require('mongoose')
const fabricSchema = new mongoose.Schema({
    fabric:String,
    fabricImage:String,
    product:{type:String,ref:"Product"}
})
module.exports = mongoose.model('Fabric',fabricSchema)