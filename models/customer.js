const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  city: { type: String },
  phone: { type: Number, trim: true, min: 11 },
});

module.exports = mongoose.model("Customer", customerSchema);
