const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");
const checkAuth = require("../middlewares/checkAuth");
const orderController = require("../controllers/orders");

router.post("/", orderController.orders_post);

router.get(
  "/order-list-currentUser/:userOrderId",
  orderController.orderListCurrentUser
);

router.get("/", orderController.orders_getall);
// router.post('/',checkAuth,orderController.orders_post);
router.get("/:orderId", orderController.orders_getId);
router.delete("/:orderid", orderController.order_delete);
router.delete("/:orderid", orderController.order_update);

module.exports = router;
