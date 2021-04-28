const Cuff = require("../models/cuff");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

exports.cuff_post = async (req, res, next) => {
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

  const cuff = new Cuff({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    detail: req.body.detail,
    cuffImage: `http://127.0.0.1:5000/${fileName}`,
  });
  try {
    fs.writeFileSync(filePath, imageBuffer, "utf8");
    const c = await cuff.save();
    return res.json({ status: "success", data: c });
  } catch (e) {
    next(e);
  }
};

exports.cuff_get = (req, res, next) => {
  Cuff.find()
    .select("name detail  _id cuffImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        cuff: docs.map((doc) => {
          return {
            name: doc.name,
            detail: doc.detail,
            cuffImage: doc.cuffImage,
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

exports.cuff_getId = async (req, res, next) => {
  try {
    const cuff = await Cuff.findById(req.params.id);
    res.json(cuff);
  } catch (err) {
    res.send("Error : " + err);
  }
};

exports.cuff_update = async (req, res, next) => {
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
  updatedUser.name = req.body.name;
  updatedUser.detail = req.body.detail;
  updatedUser.cuffImage = filePath;

  await Cuff.findByIdAndUpdate(id, updatedUser, function (err, updatedData) {
    if (err) {
      res.json(err);
    } else {
      console.log(updatedData);
      res.json({ status: "success", Data: updatedData });
    }
  });
};

exports.cuff_delete = (req, res, next) => {
  const id = req.params.id;

  Cuff.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "cuff Deleted",
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
