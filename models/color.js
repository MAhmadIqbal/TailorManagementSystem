const mongoose = require("mongoose");
const colorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  color: { type: String, required: true },
});

module.exports = mongoose.model("Color", colorSchema);
