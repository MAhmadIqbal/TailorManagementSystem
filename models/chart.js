const mongoose = require('mongoose')

const chartSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    task:String,
    day:Date
})

module.exports = mongoose.model('Chart',chartSchema)