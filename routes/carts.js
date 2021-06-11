const express = require('express')
const router = express.Router()
const cartController = require('../controllers/carts')
const cart = require('../models/cart')
const Cart = require('../models/cart')
const Product=require('../models/product')
const jwt=require('jsonwebtoken')

let userIdFromToken=function(req){
  const token1=req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token1,process.env.JWT_KEY);
  let userId=decoded.userId;
  return userId
}

router.get('/',cartController.getCartAll)
router.get('/byCartId',async (req,res)=>{
  const token1=req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token1,process.env.JWT_KEY);
  if(!decoded){
    res.status(403).send('Please login and pass the token')
  }
  req.userData = decoded;
  let userId=req.userData.userId
  
  Cart.findById(userId).exec()

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
    
    const token1=req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token1,process.env.JWT_KEY);
    
     console.log(decoded)
     let userid=decoded.userId
    
    

    try { 
      let cart = await Cart.findOne({userId:userid});
      if (cart) {
        //cart exists for this user
        let itemIndex =await cart.products.findIndex(p => p.productId == productId);
  
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
          //get userId from token
        const token1=req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token1,process.env.JWT_KEY);
        req.userData = decoded;
        let userId=req.userData.userId
      
        try{
          const cart=await Cart.findOne({userId})
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

// router.get('/',cartController.getCartAll)
// router.post('/',cartController.createCart)
// router.delete('/:cartId',cartController.deleteCart)
// router.get('/top-products',cartController.topProducts)
// router.get('/top-saled-products',cartController.topSaledProducts)

module.exports = router;
