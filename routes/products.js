const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const checkAuth = require("../middlewares/checkAuth");
const productsController = require("../controllers/products");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  }
  //reject a file
  else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  filefilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.patch("/:productId", checkAuth, productsController.products_update);

// router.get('/about',(req,res,next) => {
//     res.status(200).json({
//         message: 'handling GET requests to /products/about'
//     })
// });
router.get("/", productsController.products_get);
router.get("/", productsController.getTop_Products);
router.post("/", productsController.products_post);
// router.post('/', checkAuth, upload.single('productImage'),productsController.products_post);
router.get("/:productId");
router.patch("/:productId", checkAuth, productsController.products_update);
router.delete("/:productId", productsController.products_delete);
=======
    // router.get('/about',(req,res,next) => {
    //     res.status(200).json({
    //         message: 'handling GET requests to /products/about'
    //     })
    // });
    router.get('/',productsController.products_get);
    router.post('/', checkAuth, upload.single('productImage'),productsController.products_post);
    router.get('/:productId',productsController.products_getId);
    router.patch('/:productId',checkAuth, productsController.products_update);
    router.delete('/:productId',checkAuth,productsController.products_delete);

    //for Fabric routes
    router.post('/fabric',productsController.fabric_post)
    router.get('/fabric',productsController.fabrics_get)
    router.delete('/fabric',productsController.fabric_delete)
    // router.delete();
    // router.post('/:productId',(req,res,next) => {
        
    //     const id = req.params.productId;
    //     if(id=== 'postid'){
    //         res.status(200).json({
    //             message: 'This is post request with productId'
    //         });
    //     }else{
    //         res.status(200).json({
    //         message: 'This is post request with other id instead postid'
    //         });
    //     }
>>>>>>> 74b3a5a7c11e91b38c0a0d4683e58b87177ae616

// router.delete();
// router.post('/:productId',(req,res,next) => {

//     const id = req.params.productId;
//     if(id=== 'postid'){
//         res.status(200).json({
//             message: 'This is post request with productId'
//         });
//     }else{
//         res.status(200).json({
//         message: 'This is post request with other id instead postid'
//         });
//     }

// });
// router.get('/:productId',(req,res,next) => {
//     const id = req.params.productId;
//     if(id === 'special'){
//         res.status(200).json({
//             message: 'You discovered special id'
//         });
//     }else{
//         res.status(200).json({
//             message: 'discovered others id'
//         });
//     }
// })
module.exports = router;
