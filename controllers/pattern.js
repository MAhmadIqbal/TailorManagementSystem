const Pattern = require("../models/Pattern");
const mongoose = require("mongoose");

exports.pattern_get = (req, res, next) => {
    Pattern.find()

        .select("pattern  _id  ")
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                patterns: docs.map((doc) => {
                    return {
                        pattern: doc.pattern,
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

exports.pattern_post = async (req, res, next) => {
    const pattern = new Pattern({
        _id: new mongoose.Types.ObjectId(),
        pattern: req.body.pattern,
    });
    try {
        const p = await pattern.save();
        return res.json({ status: "success", data: p });
    } catch (e) {
        next(e);
    }
};

exports.pattern_getId = async (req, res, next) => {
    try {
        const pattern = await Pattern.findById(req.params.id);
        res.json(pattern);
    } catch (err) {
        res.send("Error : " + err);
    }
};

// exports.style_update = async (req, res, next) => {
//   const id = req.params.id;
//   let updatedUser = {};
//   updatedUser.style = req.body.style;

//   await Style.findByIdAndUpdate(id, updatedUser, function (err, updatedData) {
//     if (err) {
//       res.json(err);
//     } else {
//       console.log(updatedData);
//       res.json({ status: "success", Data: updatedData });
//     }
//   });
// };

// exports.style_delete = (req, res, next) => {
//   const id = req.params.id;

//   Style.remove({ _id: id })
//     .exec()
//     .then((result) => {
//       res.status(200).json({
//         message: "Style Deleted",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         message: "Error found",
//         error: err,
//       });
//     });
// };
