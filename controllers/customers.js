const mongoose = require("mongoose");
const Customer = require("../models/customer");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

exports.customer_get = (req, res, next) => {
  Customer.find()
    .select("name  _id city phone")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            city: doc.city,
            phone: doc.phone,
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

exports.customer_post = async (req, res, next) => {
  const customer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    city: req.body.city,
    phone: req.body.phone,
  });
  try {
    const c1 = await customer.save();
    return res.json({ status: "success", data: c1 });
  } catch (e) {
    next(e);
  }
};

exports.customer_getId = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (err) {
    res.send("Error : " + err);
  }
};

exports.customer_update = async (req, res, next) => {
  const id = req.params.id;
  let updatedUser = {};
  updatedUser.name = req.body.name;
  updatedUser.city = req.body.city;
  updatedUser.phone = req.body.phone;

  await Customer.findByIdAndUpdate(
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

exports.customer_delete = (req, res, next) => {
  const id = req.params.id;

  Customer.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Customer Deleted",
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
