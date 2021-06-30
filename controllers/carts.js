
const Cart = require("../models/cart");
const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");
const cart = require("../models/cart");
const mongoose = require("mongoose");

exports.getCartAll = (req, res, next) => {
  Cart.find()
    .populate("user")
    .populate("order")
    .exec()
    .then((docs) => {
      if (!docs) {
        res.status(404).json({
          message: "No order you selected",
        });
      }
      res.status(200).json({
        message: "Cart is placed there",
        cart: docs,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
        error: err,
      });
    });
};
// exports.createCart = (req, res, next) => {
//   Cart.findById(req.body.orderId)
//     .then((order) => {
//       if (!order) {
//         res.status(403).json({
//           message: "No order placed of that particular order Id",
//         });
//       }
//       const cart = new Cart({
//         _id: mongoose.Schema.types.ObjectId,
//         order: req.body.order,
//       });
//       return cart.save();
//     })
//     .then((result) => {
//       res.status(200).json({
//         message: "Cart has been made",
//         createdAt: {
//           _id: result._id,
//           order: result.order,
//           cart: result.cart,
//         },
//       });
//     })
// }
exports.createCart = (req, res, next) => {
  Cart.findById(req.body.productId)
    .then(productRes => {
      const cart = new Cart({
        _id: mongoose.Types.ObjectId(),
        product: productRes.name,
        productPrice: productRes.price
      })
      console.log(productRes.price)
      return cart.save()

    })
    .then(result => {
      res.status(200).json({
        message: "Cart has been made",
        createdAt: {
          id: result._id,
          cart: result
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}
// exports.deleteCart = (req, res, next) => {
//   Cart.remove({ _id: req.params._id })
//     .then(result => {
//       console.log("err", result)
//       res.status(200).json({

//         message: "cart removed",
//         result: result
//       })
//     }).catch(err => {
//       console.log(err)
//       res.status(500).json({
//         message: "error has occured",
//         error: err
//       })
//     })
// }

exports.removeFromCart = (req, res, next) => {
  cart = (req.params.id)
  Cart.find(cart, (err, result) => {
    if (err) {
      res.status(500).json(err)
    }
    return result;
  }).then(cartfinded => {
    Cart.find(req.body.productId)
  })
}
exports.topProducts = (req, res, next) => {
  Product.find({ sum: { $gt: 0 } }).sort({ sum: 'desc' }).limit(10)
    .exec()
    .then((docs) => {
      if (!cart) {
        res.status(404).json({
          message: "No product you selected",
        });
      }
      res.status(200).json({
        message: "Cart is placed there",
        cart: docs,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
        error: err,
      });
    });
};

exports.deleteCart = (req, res, next) => {
  Cart.remove({ _id: req.params._id }).exec()
    .then((result) => {
      console.log("err", result)
      res.status(200).json({

        message: "cart removed",
        result: result
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error has occured",
        error: err,
      });
    });
};
