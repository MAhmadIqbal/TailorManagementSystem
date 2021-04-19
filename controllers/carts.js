const Cart = require('../models/cart')
const User = require('../models/user')
const Order = require('../models/order')
const Product = require('../models/product')
const cart = require('../models/cart')
const { Mongoose } = require('mongoose')

exports.getCartAll = (req,res,next)=>{
    Cart.find().populate('user')
    .populate('order')
    .select()
    .exec
    .then(docs=>{
        if(!cart){
            res.status(404).json({
                message:"No order you selected"
            })
        }
        res.status(200).json({
            message:"Cart is placed there",
            cart:docs
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            message:"Internal server error",
            error:err
        })
    })
}
exports.createCart = (req,res,next)=>{
    Cart.findById(req.body.orderId)
    .then(order=>{
        if(!order){
            res.status(403).json({
                message:"No order placed of that particular order Id"
            })
        }const cart = new Cart({
            _id: mongoose.Schema.types.ObjectId,
            order:req.body.order
          }) 
          return cart.save()
      
        })
    .then(result=>{
        res.status(200).json({
            message:"Cart has been made",
            createdAt:{
                _id: result._id,
                order:result.order,
                cart:result.cart
            },
            })
        }).catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
}
exports.deleteCart = (req,res,next)=>{
    Cart.remove({_id:req.params._id})
    .then(result=>{
        res.status(200).json({
            message:"order removed from cart",

        })

    }).catch(err=>{ 
        console.log(err)
        res.status(500).json({
            message:"error has occured",
            error:err
        })
       })
}
exports.topProducts = (req,res,next)=>{
    Product.find({sum:{$gt:0}}).sort({sum:'desc'}).limit(10)
    .exec()
    .then(docs=>{
        res.status(200).json({
            message:"Top Product list",
            'products':docs
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            err
        })
    })
}
