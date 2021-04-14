const express=require('express')
const Product = require('../models/product')
const Order = require('../models/order')
const User = require('../models/usersRest')
const Chart = require('../models/chart')
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

router.get('/chart',(req,res)=>{
    Order.find({created_At:Date.now}).count().then(function todayTasks(){  
            res.status(200).json({
                message:"tasks of the day",
                'tasks':todayTasks,
                'Date':Date.now()
            })
        })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router