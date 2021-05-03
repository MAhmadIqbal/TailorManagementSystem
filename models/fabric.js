const mongoose = require("mongoose");
const fabricSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fabric: { type: String, required: true },
  fabricImage: { type: String, required: true },
  product: { type: String, ref: "Product" },
});

module.exports = mongoose.model("Fabric", fabricSchema);
