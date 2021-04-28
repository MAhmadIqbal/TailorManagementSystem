const Fabric = require("../models/fabric");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

exports.fabric_post = async (req, res, next) => {
  var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {};

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
  let filePath = path.join(__dirname, "../uploads/") + fileName;

  const fabric = new Fabric({
    _id: new mongoose.Types.ObjectId(),
    fabric: req.body.fabric,
    fabricImage: `http://127.0.0.1:5000/${fileName}`,
  });
  try {
    fs.writeFileSync(filePath, imageBuffer, "utf8");
    const f = await fabric.save();
    return res.json({ status: "success", data: f });
  } catch (e) {
    next(e);
  }
};

exports.fabric_get = (req, res, next) => {
  Fabric.find()
    .select("fabric  _id fabricImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        fabric: docs.map((doc) => {
          return {
            fabric: doc.fabric,
            fabricImage: doc.fabricImage,
            _id: doc._id,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.fabric_getId = async (req, res, next) => {
  try {
    const fabric = await Fabric.findById(req.params.id);
    res.json(fabric);
  } catch (err) {
    res.send("Error : " + err);
  }
};

exports.fabric_update = async (req, res, next) => {
  var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {};

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

  const id = req.params.id;
  let updatedUser = {};
  updatedUser.fabric = req.body.fabric;
  updatedUser.fabricImage = filePath;

  await Fabric.findByIdAndUpdate(id, updatedUser, function (err, updatedData) {
    if (err) {
      res.json(err);
    } else {
      console.log(updatedData);
      res.json({ status: "success", Data: updatedData });
    }
  });
};

exports.fabric_delete = (req, res, next) => {
  const id = req.params.id;

  Fabric.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Fabric Deleted",
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
