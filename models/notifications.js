const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    title:String,
    description:String
})

module.exports = mongoose.model('Notification',notificationSchema)