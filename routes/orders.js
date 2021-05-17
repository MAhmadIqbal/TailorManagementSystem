const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");
const checkAuth = require("../middlewares/checkAuth");
const orderController = require("../controllers/orders");
const cart = require("../models/cart");

router.post("/", orderController.orders_post);

router.get(
  "/order-list-currentUser/:userOrderId",
  orderController.orderListCurrentUser
);

router.get("/", orderController.orders_getall);
// router.post('/',checkAuth,orderController.orders_post);
router.post('/order-placed',async(req,res)=>{
  const token1 = req.headers.authorization.split(" ")[1];
  const decoded  =jwt.verify(token1, process.env.JWT_KEY);
  const userId=decoded.userId
  Cart.find({cart:userId}).exec().then(result=>{
    var array=result.products;
    for(var i=0;i<=(array.length);i++){
      var total = array[i].price+total
      return total;
    }
    res.status(200).json({
      message:"Order has been placed",
      'payment method':req.body.paymentMethod,
      "shipping Method":req.body.shippingMethod,
      "Payment Status":req.body.paymentStatus
    })
  }
  )
})
router.get("/:orderId", orderController.orders_getId);
router.delete("/:orderid", orderController.order_delete);
router.delete("/:orderid", orderController.order_update);

module.exports = router;
