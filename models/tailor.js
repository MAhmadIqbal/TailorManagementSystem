const mongoose = require("mongoose");
const tailorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  address: { type: String },
  shopname: { type: String },
  phone: { type: Number, trim: true, min: 11 },
});

module.exports = mongoose.model("Tailor", tailorSchema);
