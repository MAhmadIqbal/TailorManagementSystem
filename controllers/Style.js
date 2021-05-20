const Style = require("../models/Style");
const mongoose = require("mongoose");

exports.style_get = (req, res, next) => {
  Style.find()

    .select("style  _id  ")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        styles: docs.map((doc) => {
          return {
            style: doc.style,
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

exports.style_post = async (req, res, next) => {
  const style = new Style({
    _id: new mongoose.Types.ObjectId(),
    style: req.body.style,
  });
  try {
    const c = await style.save();
    return res.json({ status: "success", data: c });
  } catch (e) {
    next(e);
  }
};

exports.style_getId = async (req, res, next) => {
  try {
    const style = await Style.findById(req.params.id);
    res.json(style);
  } catch (err) {
    res.send("Error : " + err);
  }
};

exports.style_update = async (req, res, next) => {
  const id = req.params.id;
  let updatedUser = {};
  updatedUser.style = req.body.style;

  await Style.findByIdAndUpdate(id, updatedUser, function (err, updatedData) {
    if (err) {
      res.json(err);
    } else {
      console.log(updatedData);
      res.json({ status: "success", Data: updatedData });
    }
  });
};

exports.style_delete = (req, res, next) => {
  const id = req.params.id;

  Style.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Style Deleted",
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
