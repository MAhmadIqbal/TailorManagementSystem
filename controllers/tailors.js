const mongoose = require("mongoose");
const Tailor = require("../models/tailor");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

exports.tailors_get = (req, res, next) => {
  Tailor.find()

    .select("name address _id shopname phone")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            address: doc.address,
            phone: doc.phone,
            shopname: doc.shopname,
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

exports.tailor_post = async (req, res, next) => {
  const tailor = new Tailor({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    address: req.body.address,
    shopname: req.body.shopname,
    phone: req.body.phone,
  });
  try {
    const t1 = await tailor.save();
    return res.json({ status: "success", data: t1 });
  } catch (e) {
    next(e);
  }
};

exports.tailor_getId = async (req, res, next) => {
  try {
    const tailor = await Tailor.findById(req.params.id);
    res.json(tailor);
  } catch (err) {
    res.send("Error : " + err);
  }
};

exports.tailors_update = async (req, res, next) => {
  const id = req.params.id;
  let updatedUser = {};
  updatedUser.name = req.body.name;
  updatedUser.address = req.body.address;
  updatedUser.shopname = req.body.shopname;
  updatedUser.phone = req.body.phone;

  await Tailor.findByIdAndUpdate(id, updatedUser, function (err, updatedData) {
    if (err) {
      res.json(err);
    } else {
      console.log(updatedData);
      res.json({ status: "success", Data: updatedData });
    }
  });
};

exports.tailor_delete = (req, res, next) => {
  const id = req.params.id;

  Tailor.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Tailor Deleted",
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
