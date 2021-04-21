const Cart = require('../models/cart')
const User = require('../models/user')
const Order = require('../models/order')
const Product = require('../models/product')
const cart = require('../models/cart')
const mongoose = require('mongoose')

exports.getCartAll = (req,res,next)=>{
    Cart.find()
    .populate('product')
    .populate('order')
    .exec()
    .then(docs=>{
        if(!cart){
            res.status(404).json({
                message:"No product you selected"
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
    Cart.findById(req.body.userId)
    .then(user=>{
        const cart = new Cart({
            _id: mongoose.Types.ObjectId(),
            user:user,
            product:req.body.productId,
            order:req.body.orderId
          }) 
          return cart.save()
      
        })
    .then(result=>{
        res.status(200).json({
            message:"Cart has been made",
            createdAt:{
                id: result._id,
                cart:result.product
            },
            })
        })
    .catch(err=>{
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
