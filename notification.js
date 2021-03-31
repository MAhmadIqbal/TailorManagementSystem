const express = require('express')
const bodyparser = require('body-parser')
const webpush = require('web-push')
const path = require('path')

const app = express()
const publicVapidkeys = 'BMfauRp-WWbrADVLcrlsfAtLmpIEJ_JMO8fwE12HbAdPGP_UI9fda3OeOvZ2zfGe9E8SXJd_9hpQW0Ydf6C71oE'
const privateVapidkeys = 'LLOyKAaVgCWYKptN7oUorbudQq0R8CACB5O7WHdl-es'
webpush.setVapidDetails('mailto:test@test.com',publicVapidkeys,privateVapidkeys)