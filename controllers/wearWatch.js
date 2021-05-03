const WearWatch = require("../models/wearWatch");
const mongoose = require("mongoose");

exports.wearWatch_get = (req, res, next) => {
  WearWatch.find()

    .select("wearWatch  _id  ")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        wearWatch: docs.map((doc) => {
          return {
            wearWatch: doc.wearWatch,
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

exports.wearWatch_post = async (req, res, next) => {
  const wearWatch = new WearWatch({
    _id: new mongoose.Types.ObjectId(),
    wearWatch: req.body.wearWatch,
  });
  try {
    const c = await wearWatch.save();
    return res.json({ status: "success", data: c });
  } catch (e) {
    next(e);
  }
};

exports.wearWatch_getId = async (req, res, next) => {
  try {
    const wearWatch = await WearWatch.findById(req.params.id);
    res.json(wearWatch);
  } catch (err) {
    res.send("Error : " + err);
  }
};

exports.wearWatch_update = async (req, res, next) => {
  const id = req.params.id;
  let updatedUser = {};
  updatedUser.wearWatch = req.body.wearWatch;

  await WearWatch.findByIdAndUpdate(
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

exports.wearWatch_delete = (req, res, next) => {
  const id = req.params.id;

  WearWatch.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "WearWatch Deleted",
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
