const Color = require("../models/color");
const mongoose = require("mongoose");

exports.color_get = (req, res, next) => {
  Color.find()

    .select("color  _id  ")
    .exec()
    .then((docs) => {
      const response = {
        color: docs.map((doc) => {
          return {
            color: doc.color,
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

exports.color_post = async (req, res, next) => {
  const color = new Color({
    _id: new mongoose.Types.ObjectId(),
    color: req.body.color,
  });
  try {
    const c = await color.save();
    return res.json({ status: "success", data: c });
  } catch (e) {
    next(e);
  }
};

exports.color_getId = async (req, res, next) => {
  try {
    const color = await Color.findById(req.params.id);
    res.json(color);
  } catch (err) {
    res.send("Error : " + err);
  }
};

exports.color_update = async (req, res, next) => {
  const id = req.params.id;
  let updatedUser = {};
  updatedUser.color = req.body.color;

  await Color.findByIdAndUpdate(id, updatedUser, function (err, updatedData) {
    if (err) {
      res.json(err);
    } else {
      console.log(updatedData);
      res.json({ status: "success", Data: updatedData });
    }
  });
};

exports.color_delete = (req, res, next) => {
  const id = req.params.id;

  Color.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Color Deleted",
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
