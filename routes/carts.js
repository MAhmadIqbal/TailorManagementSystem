const express = require("express");
const router = express.Router();
const cartController = require("../controllers/carts");
const cart = require("../models/cart");

router.get("/cart", cartController.getCartAll);
router.post("/cart", cartController.createCart);
router.delete("/cart:cartId", cartController.deleteCart);
router.get("/top-products", cartController.topProducts);

// router.get('/',cartController.getCartAll)
// router.post('/',cartController.createCart)
// router.delete('/:cartId',cartController.deleteCart)
// router.get('/top-products',cartController.topProducts)
// router.get('/top-saled-products',cartController.topSaledProducts)

module.exports = router;
