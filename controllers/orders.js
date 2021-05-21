const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");
const jwt=require('jsonwebtoken')
const Cart = require('../models/cart')

exports.orders_getall = async (req, res, next) => {
  await Order.find()
    .select("name orderNo _id delivery")
    .exec()
    .then(docs => {
      if(docs.length===0){
        res.status(404).send('Nothing has found in orders')
      }
      const response = {
        count: docs.length,
        order: docs.map(doc => {
        return {
          id: doc._id,
          orderNo: doc.orderNo,
          name: doc.name,
          delivery: doc.delivery,

          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + doc._id,
          },
        };
      })
      }
      
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message:'error occured',
        'error': err
      });
    });
};
// exports.orders_getall = (req,res,next) => {
//     Order.find()
//     .populate('product')
//     .exec()
//     .then(docs=> {
//         console.log(res.status(200))
//         res.status(200).json({
//             count : docs.length,
//             orders : docs.map(doc =>{
//                 return{
//                     _id : doc._id,
//                     product : doc.product,
//                     quantity : doc.quantity,
//                     request : {
//                         type: 'GET',
//                         url : 'http://localhost:3000/orders/'+doc._id
//                     }
//                 }
//             })
//         });
//     })
//     .catch(err =>{
//         res.status(500).json({
//             error : err
//         });
//     });
// }
exports.orders_getId = (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.order_delete = (req, res, next) => {
  Order.remove({ _id: req.params.orderid })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Order Deleted",
        msn: "rrr",
        messageResult: result,
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// exports.orders_postId = (req, res, next) => {
//   const id = req.params.postid;
//   if (id === "postid") {
//     res.status(200).json({
//       message: "postid is requested",
//     });
//   }
// };

exports.orders_post = async (req, res, next) => {

  const token1 = req.headers.authorization.split(" ")[1];
  const decoded  =jwt.verify(token1, process.env.JWT_KEY);
  const decodeduserId=decoded.userId
  Cart.find({userId:decodeduserId}).exec()
  .then(result=>{
    if(result==undefined|| result.length===0){
      res.status(404).send('nothing in cart has found')
    }
    var array=[];
    array=result[0].products;
    var arraylength=array.length
    console.log("line126",array)
    for(var i=0;i<arraylength;i++){
      var total = 0
      total=array[i].price+total
      console.log(total)
    }
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      user:decodeduserId,
      orderNo: req.body.orderNo,
      name: req.body.name,
      delivery: req.body.delivery,
      totalPrice:total,
      paymentMethod:req.body.paymentMethod,
      shippingMethod:req.body.shippingMethod,
      paymentStatus:req.body.paymentStatus
    })
   try{
    order.save((err,result)=>{
      if(err){
        res.status(505).send(err)
      }
      if(result){
        res.status(200).json({
          message:"Order has been placed",
          'Order':result
        })
      }  
    })
    
   }catch(err){
     {
       res.status(500).send(err)
     }
   }
    
  })
};

// exports.orderListCurrentUser = (req, res, next) => {
//   Order.find({ user: req.params.userOrderId })
//     .exec()
//     .then((result) => {
//       res.status(200).json({
//         message: "order list here",
//         total_orders_count_placed_by_user: result.length,
//         "order-list": result,
//       });
//     })
//     .catch((err) => {
//       console.log(req.user._id);
//       res.status.json({
//         message: "error occured",
//         error: err,
//       });
//     });

// };

exports.orders_postId = (req, res, next) => {
  const id = req.params.postid;
  if (id === "postid") {
    res.status(200).json({
      message: "postid is requested",
    });
  }
};
// exports.orders_post = (req,res,next) => {
//         Product.findById(req.body.productId)
//         .then(product=>{
//             if(!product){
//                 return res.status(404).json({
//                     message : 'Product not found'
//                 });
//             }
//             const order = new Order({
//                 _id : mongoose.Types.ObjectId(),
//                 quantity : req.body.quantity,
//                 product : req.body.product
//             });
//             return order.save()
//         })
//            .then(result => {
//                 console.log(result);
//                 res.status(201).json({
//                     message : "Order Stored",
//                     createdOrder :{
//                         _id : result._id,
//                         product : result.product,
//                         quantity : result.quantity,
//                     } ,
//                     request : {
//                         type:'GET',
//                         url : "http://localhost:3000/orders/"+result._id
//                     }
//                 });
//             })
//             .catch(err =>{
//                 console.log(err)
//                 res.status(500).json({
//                     error : err
//                 });
//             })
//         }

exports.order_update = (req, res, next) => {
  const id = req.params.orderId;
  const updateOps = {};
  // for(const ops in req.body){
  // updateOps[ops.propName] = ops.value;
  // }
  updateOps[req.body.propName] = req.body.value;
  console.log("updateOps", updateOps);
  Order.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Order Updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};
exports.orderListCurrentUser = (req, res, next) => {
  Order.find({ user: req.params.userOrderId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "order list here",
        total_orders_count_placed_by_user: result.length,
        "order-list": result,
      });
    })
    .catch((err) => {
      console.log(req.user._id);
      res.status.json({
        message: "error occured",
        error: err,
      });
    });
};
exports.userOrders = (req, res, next) => {
  id = req.params.userId;
  Order.find({ user: id }).exec((err, result) => {
    if (err) {
      res.status(500).json({
        message: "error occured",
        error: err,
      });
    }
    res.status(200).json({
      message: "Order of this loggedin user",
      result: result,
    });
  });
};
