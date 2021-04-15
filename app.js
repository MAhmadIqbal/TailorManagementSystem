
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const expressSession = require('express-session')

const engines = require("consolidate");
const paypal = require("paypal-rest-sdk");

const productsRoutes = require('./routes/products')
const ordersRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');
const usersRoutes = require('./routes/users')
const paymentRoutes = require('./routes/payments')
const notificationRoutes = require('./routes/notifications')
const dashboardRoutes = require('./routes/dashboard')



//MongoDB configuration of CRUD

//const dbConfigCRUD = require('./api/config/database.config')
//require global mongoose
const mongoose = require('mongoose');



mongoose.Promise =global.Promise;
// MongoDB connection

                    // mongoose.connect('mongodb+srv://node-rest:<node-rest>@node-rest-shop.b6c66.mongodb.net/<node-rest-shop>?retryWrites=true&w=majority',
                    // {  useNewUrlParser: true }
                    // )
//connecting the database REST_api 
const url ='mongodb+srv://node-rest:node-rest@node-rest-shop.b6c66.mongodb.net/node-rest?retryWrites=true&w=majority'
// const DB = url ||'mongodb://localhost:27017/TMS'
// console.log(DB)
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: true, 
}).then(()=>{
    console.log(`Db connected successfully`);
}).catch(err=>{
        console.log("db not connected due to some error",err);
        process.exit();
})
// connecting the database CRUD
// mongoose.connect(dbConfigCRUD.url,{
// useNewUrlParser : true
// }).then(()=>{
// console.log('Successfully connected to the database');
// }).catch(err=>{
// console.log('Could not connect to the database ...',err);
// process.exit();
// })


//Morgan third-party middleware
app.use(morgan('dev'));
app.use('./uploads', express.static(path.join(__dirname, './uploads')));

            // bodyparser 
//parse requests of content -type-application/json
app.use(bodyParser.json());

//  parse requests of content-type-application
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// validation uses there
app.use(expressValidator())
// session

//EJS engine set
app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
        "AarUi7DfcZaVwTyuHOE2qMPGP1Gy65T8KNHicseSgSXB-gm_2upRM74fU-MKmslNaHKqNOUsxMrNv9I-",
    client_secret:
        "EI0ea3hVzYFwuts33i0RUVhxF48woSUSg7lwNbkImLrHpcEYpUmJPRXdf4CXn4kFacsRoZ-62cn9Xe6h"
});
// headers handling cors error.

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested with, Content-Type, Accept, Authorization',
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

//Routes which handles requests
app.use('/products' , productsRoutes);
app.use('/orders' , ordersRoutes);
app.use('/user', userRoutes);
app.use('/users',usersRoutes);
app.use('/payment',paymentRoutes)
app.use('/notification',notificationRoutes)
app.use('/dashboard',dashboardRoutes)
// Handling Error
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})
app.use((error,req,res,next) => {
    res.status(error.status || 500).json({
        error: error.message
    });
});
module.exports = app;