const mongoose = require('mongoose')
const fabricSchema = new mongoose.Schema({
    name:String,
    shirtLengthDetail:String,
    shirtLengthImage:String
})
module.exports = mongoose.model('Fabric',fabricSchema)