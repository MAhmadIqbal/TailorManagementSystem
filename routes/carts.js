const express = require('express')
const router = express.Router()
const cartController = require('../controllers/carts')
const Cart = require('../models/cart')
const Product=require('../models/product')

router.get('/',cartController.getCartAll)
//new caer route
router.post("/cart", async (req, res) => {
    const { productId, quantity } = req.body;
    
    var product= await Product.find({_id:productId}).exec().then(results=>{
      return results
    })

    const name=product[0].name
    const price=product[0].price
    const userId = req.body.userId; 
  
    try { 
      let cart = await Cart.findOne({ userId });
      if (cart) {
        //cart exists for this user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new product item
          cart.products.push({ productId, quantity, name, price });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ productId, quantity, name, price }]
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });
//rest of routes of cart
router.post('/',cartController.createCart)
router.delete('/:cartId',cartController.deleteCart)

//Top product list
router.get('/top-products',cartController.topProducts)
// router.get('/top-saled-products',cartController.topSaledProducts)



module.exports = router