const ButtonColor = require("../models/buttonColor");
const mongoose = require("mongoose");

exports.buttonColor_get = (req, res, next) => {
  ButtonColor.find()

    .select("buttonColor  _id  ")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            buttonColor: doc.buttonColor,
            _id: doc._id,
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
  const buttonColor = new ButtonColor({
    _id: new mongoose.Types.ObjectId(),
    buttonColor: req.body.buttonColor,
  });
  try {
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
