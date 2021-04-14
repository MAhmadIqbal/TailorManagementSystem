const Pocket = require("../models/pocket");
const mongoose = require("mongoose");

exports.pocket_get = (req, res, next) => {
  Pocket.find()

    .select("pocket  _id  ")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            pocket: doc.pocket,
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

exports.pocket_post = async (req, res, next) => {
  const pocket = new Pocket({
    _id: new mongoose.Types.ObjectId(),
    pocket: req.body.pocket,
  });
  try {
    const c = await pocket.save();
    return res.json({ status: "success", data: c });
  } catch (e) {
    next(e);
  }
};

exports.pocket_getId = async (req, res, next) => {
  try {
    const pocket = await Pocket.findById(req.params.id);
    res.json(pocket);
  } catch (err) {
    res.send("Error : " + err);
  }
};

exports.pocket_update = async (req, res, next) => {
  const id = req.params.id;
  let updatedUser = {};
  updatedUser.pocket = req.body.pocket;

  await Pocket.findByIdAndUpdate(id, updatedUser, function (err, updatedData) {
    if (err) {
      res.json(err);
    } else {
      console.log(updatedData);
      res.json({ status: "success", Data: updatedData });
    }
  });
};

exports.pocket_delete = (req, res, next) => {
  const id = req.params.id;

  Pocket.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Pocket Deleted",
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
