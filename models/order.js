const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  // quantity: { type: Number, default: 1 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
  name: { type: String },
  orderNo: { type: Number },
  totalPrice: { type: Number },
  delivery: { type: Date },
  paymentMethod: String,
  shippingMethod: String,
  paymentStatus: { type: String, enum: ['pending', 'processing', 'delivered'], default: 'pending' },
  createdAt: { type: Number, default: Date.now },

}, { timestamps: true });


module.exports = mongoose.model("order", orderSchema);

// fabricType: { type: String },
// collar: { type: String },
// length: { type: String },
// cuff: { type: String },
// pocket: { type: String },
// buttonColor: { type: String },