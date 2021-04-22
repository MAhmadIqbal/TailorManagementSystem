const ButtonColor = require("../models/buttonColor");
const mongoose = require("mongoose");
const path = require("path");

const fs = require("fs");
const mime = require("mime");

exports.buttonColor_get = (req, res, next) => {
  ButtonColor.find()

    .select("buttonColor  _id buttonImage ")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        buttons: docs.map((doc) => {
          return {
            buttonColor: doc.buttonColor,
            _id: doc._id,
            buttonImage: doc.buttonImage,
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errors: err,
      });
    });
};

exports.buttonColor_post = async (req, res, next) => {
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

  const buttonColor = new ButtonColor({
    _id: new mongoose.Types.ObjectId(),
    buttonColor: req.body.buttonColor,
    buttonImage: filePath,
  });
  try {
    fs.writeFileSync(filePath, imageBuffer, "utf8");

    const c = await buttonColor.save();
    return res.json({ status: "success", data: c });
  } catch (e) {
    next(e);
  }
};

exports.buttonColor_getId = async (req, res, next) => {
  try {
    const buttonColor = await ButtonColor.findById(req.params.id);
    res.json(buttonColor);
  } catch (err) {
    res.send("Error : " + err);
  }
};

exports.buttonColor_update = async (req, res, next) => {
  const id = req.params.id;
  let updatedUser = {};
  updatedUser.buttonColor = req.body.buttonColor;

  await ButtonColor.findByIdAndUpdate(
    id,
    updatedUser,
    function (err, updatedData) {
      if (err) {
        res.json(err);
      } else {
        console.log(updatedData);
        res.json({ status: "success", Data: updatedData });
      }
    }
  );
};

exports.buttonColor_delete = (req, res, next) => {
  const id = req.params.id;

  ButtonColor.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "ButtonColor Deleted",
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
