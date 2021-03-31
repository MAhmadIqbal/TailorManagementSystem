const express=require('express')
const Product = require('../models/product')
const Order = require('../models/order')
const User = require('../models/usersRest')
const router = express.Router()

router.get('/',(req,res)=>{
    Product.find().count().exec().then(product=>{
        Order.find().count().then(order=>{
            User.find({role:'customer'}).count().then(customer=>{ //for customers counts
                User.find({role:'tailor'}).count().then(tailor=>{   //for Tailor counts
                    res.status(200).json({
                        message:"dashboard",
                        'products':product,
                        'orders':order,
                        'customers':customer,
                        'tailors':tailor
                    })
                })    
            })
            
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).send(err)
    })
    
})

module.exports = router