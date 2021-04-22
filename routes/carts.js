const express = require("express");
const router = express.Router();
const cartController = require("../controllers/carts");

router.get("/cart", cartController.getCartAll);
router.post("/cart", cartController.createCart);
router.delete("/cart:cartId", cartController.deleteCart);
router.get("/top-products", cartController.topProducts);

module.exports = router;
