const mongoose = require("mongoose");
const shirtLengthSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  shirtLengthImage: { type: String, required: true },
  detail: { type: String },
});

module.exports = mongoose.model("ShirtLength", shirtLengthSchema);
