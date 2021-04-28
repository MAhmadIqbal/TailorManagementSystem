const mongoose = require("mongoose");
const ordersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  delivery: { type: Date },
  name: { type: String },
  orderNo: { type: Number },
});

module.exports = mongoose.model("orders", ordersSchema);
