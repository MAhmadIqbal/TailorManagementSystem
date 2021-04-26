const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");

exports.orders_getall = async (req, res, next) => {
  await Order.find()
    .select("name orderNo  _id delivery")
    .exec()
    .then((docs) => {
      console.log(res.status(200));
      res.status(200).json({
        count: docs.length,

        order: docs.map((doc) => {
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
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
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
    .populate("product")
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
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    orderNo: req.body.orderNo,
    name: req.body.name,
    delivery: req.body.delivery,
  });

  try {
    const p1 = await order.save();
    return res.json({ status: "success", data: p1 });
  } catch (e) {
    next(e);
  }
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
  Oroduct.update({ _id: id }, { $set: updateOps })
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
