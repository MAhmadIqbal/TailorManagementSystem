const mongoose = require("mongoose");
const Product = require("../models/product");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

exports.products_get = (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id,
            },
          };
        }),
      };
      // console.log(docs);
      // if(docs.length >= 0){
      res.status(200).json(response);
      // }else{
      //     res.status(404).json({
      //         message : 'No Entries found'
      //     })
      // }
      //     res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
  //     res.status(200).json({
  //     message: 'handling GET requests to /products/home'
  //     })
};

exports.products_post = async (req, res, next) => {
  var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {};

  console.log("matches : ", matches);
  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  let extension = mime.getExtension(type);
  let fileName = Math.floor(Math.random() * 100) + 1 + "image." + extension;
  let filePath = path.join(__dirname, "/uploads/") + fileName;

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: filePath,
    color: req.body.color,
    category: req.body.category,
  });
  try {
    fs.writeFileSync(filePath, imageBuffer, "utf8");
    const p1 = await product.save();

    return res.json({ status: "success", data: p1 });
  } catch (e) {
    next(e);
  }
};

// exports.products_post = (req, res, next) => {
//   Product.find();

//   var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
//     response = {};

//   if (matches.length !== 3) {
//     return new Error("Invalid input string");
//   }

//   response.type = matches[1];
//   response.data = new Buffer(matches[2], "base64");
//   let decodedImg = response;
//   let imageBuffer = decodedImg.data;
//   let type = decodedImg.type;
//   let extension = mime.getExtension(type);
//   let fileName = Math.floor(Math.random() * 100) + 1 + "image." + extension;
//   fs.writeFileSync("./images/" + fileName, imageBuffer, "utf8");

//   const product = new Product({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     price: req.body.price,
//     color: req.body.color,
//     category: req.body.category,
//   });
//   product
//     .save()
//     .then((result) => {
//       console.log(result);
//       res.status(201).json;
//       {
//         message: "created object successfully";
//         createdProduct: {
//           name: result.name;
//           price: result.price;
//           _id: result._id;
//           color: result.color;
//           category: result.color;
//           request: {
//             type: "GET";
//             url: "http://localhost:3000/products/" + result._id;
//           }
//         }
//       }
//     })
//     .catch((err) => console.log(err));
//   res.status(201).json({
//     message: "Handling Post request to /product",
//     createdProduct: { product },
//   });
// };

// exports.products_post = (req, res, next) => {
//   Product.find();
//   const product = new Product({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     price: req.body.price,
//     color: req.body.color,
//     category: req.body.category,
//     productImage: req.file.path,
//   });
//   product
//     .save()
//     .then((result) => {
//       console.log(result);
//       res.status(201).json;
//       {
//         message: "created object successfully";
//         createdProduct: {
//           name: result.name;
//           price: result.price;
//           _id: result._id;
//           color: result.color;
//           category: result.color;
//           request: {
//             type: "GET";
//             url: "http://localhost:3000/products/" + result._id;
//           }
//         }
//       }
//     })
//     .catch((err) => console.log(err));
//   res.status(201).json({
//     message: "Handling Post request to /product",
//     createdProduct: { product },
//   });
// };

exports.products_getId = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            description: "GET all products",
            url: "http://localhost:3000/products",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No Valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.products_update = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  // for(const ops in req.body){
  // updateOps[ops.propName] = ops.value;
  // }
  updateOps[req.body.propName] = req.body.value;
  console.log("updateOps", updateOps);
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product Updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};
exports.products_delete = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error found",
        error: err,
      });
    });
};
