const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    title:String,
    body:String
})

module.exports = mongoose.model('Notification',notificationSchema)