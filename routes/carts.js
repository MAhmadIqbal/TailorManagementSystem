const express = require('express')
const router = express.Router()
const cartController = require('../controllers/carts')
const cart = require('../models/cart')
const Cart = require('../models/cart')
const Product = require('../models/product')
const jwt = require('jsonwebtoken')

let userIdFromToken = function (req) {
  const token1 = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token1, process.env.JWT_KEY);
  let userId = decoded.userId;
  return userId
}

router.get('/', cartController.getCartAll)


router.get('/byitem_id', async (req, res) => {
  const token1 = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token1, process.env.JWT_KEY);
  if (!decoded) {
    res.status(403).send('Please login and pass the token')
  }
  req.userData = decoded;
  let userId = req.userData.userId

  console.log("user id", userId)

  Cart.findOne({ userId }).exec()

    .then(result => {
      res.status(201).json({
        message: "cart of user placed here",
        result
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "error",
        error: err
      })
    })
})
//new caer route
router.post("/cart", async (req, res) => {
  const { productId, quantity } = req.body;

  var product = await Product.find({ _id: productId }).exec().then(result => {
    return result;
  })

  console.log(product)

  const name = product[0].name
  const price = product[0].price

  const token1 = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token1, process.env.JWT_KEY);

  console.log(decoded)
  let userid = decoded.userId

  try {
    let cart = await Cart.findOne({ userId: userid });
    if (cart) {
      console.log("if 64")
      //cart exists for this user
      let itemIndex = await cart.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        console.log(" 69")

        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        console.log("if 76")

        //product does not exists in cart, add new product item
        cart.products.push({ productId, quantity, name, price });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      console.log("if 84")

      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId: userid,
        products: [{ productId, quantity, name, price }]
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
})

//route of deleting item from cart
// router.post('/remove-items', async (req, res) => {
//   itemId = req.body.itemId
//   //get userId from token
//   const token1 = req.headers.authorization.split(" ")[1];
//   const decoded = jwt.verify(token1, process.env.JWT_KEY);
//   let userid = decoded.userId
//   console.log("userId", userid, token1)
//   try {
//     const cart = await Cart.find({ userId: userid })
//     console.log("cart", cart)
//     if (cart) {
//       const itemIndex = cart.products.findIndex(p => p._id == itemId)
//       console.log("itemIndex", itemIndex)
//       if (itemIndex > -1) {
//         cart.products.splice(itemIndex, 1)
//       }
//       await cart.save()
//       return res.status(201).send(cart)
//     }
//   } catch (err) {
//     console.log(err)
//     res.status(500).send(err)
//   }

// })

router.post('/remove-items', async (req, res) => {
  itemId = req.body.itemId
  //get userId from token
  const token1 = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token1, process.env.JWT_KEY);
  let userid = decoded.userId
  // let userid = "604b3e7bb2e0dc18ac7d40b4"


  try {
    // const cart = await Cart.find({ userId: userid })
    const cart = await Cart.findOne({ userId: userid })

    console.log("cart", cart)
    if (cart) {

      console.log("cart products", cart.products)

      const itemIndex = await cart.products.findIndex(p => p._id == itemId)

      // findIndex -> if condition match return index no: else -1
      console.log("itemIndex", itemIndex)
      if (itemIndex > -1) {

        //  1 -> replace 0-> add
        cart.products.splice(itemIndex, 1)
      }
      await cart.save()
      return res.status(201).send(cart)
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }

})
//rest of routes of cart  
router.post('/', cartController.createCart)
router.delete('/:cartId', cartController.deleteCart)

// router.get('/',cartController.getCartAll)
// router.post('/',cartController.createCart)
// router.delete('/:cartId',cartController.deleteCart)
// router.get('/top-products',cartController.topProducts)
// router.get('/top-saled-products',cartController.topSaledProducts)

module.exports = router;
