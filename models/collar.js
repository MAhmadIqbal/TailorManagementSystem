const mongoose = require('mongoose')
const fabricSchema = new mongoose.Schema({
    name:String,
    collarDetail:String,
    collarImage:String
})
module.exports = mongoose.model('Collar',fabricSchema)