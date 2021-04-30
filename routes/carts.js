const express = require('express')
const router = express.Router()
const cartController = require('../controllers/carts')
const cart = require('../models/cart')
const Cart = require('../models/cart')
const Product=require('../models/product')

router.get('/',cartController.getCartAll)
router.get('/:cartId',async (req,res)=>{
  cartId=req.params.cartId
  Cart.findById(cartId).exec()
  .then(result=>{
    res.status(201).json({
      message:"cart of user placed here",
      result
    })
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message:"error",
      error:err
    })
  })
})
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
//route of deleting item from cart
 router.post('/remove-items',async (req,res)=>{
        itemId=req.body.itemId
        try{
          const cart=await Cart.findOne({userId:req.body.userId})
        if(cart){
          const itemIndex=cart.products.findIndex(p=>p._id==itemId)
          if(itemIndex>-1)
          {
            cart.products.splice(itemIndex,1)
          }
           await cart.save()
          return res.status(201).send(cart)
        }
      }catch(err){
        console.log(err)
        res.status(500).send(err)
      }
 })
//rest of routes of cart  
router.post('/',cartController.createCart)
router.delete('/:cartId',cartController.deleteCart)

//Top product list
router.get('/top-products',cartController.topProducts)
// router.get('/top-saled-products',cartController.topSaledProducts)



module.exports = router