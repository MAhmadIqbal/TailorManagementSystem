const mongoose = require("mongoose");
const styleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  style: { type: String, required: true },
});

module.exports = mongoose.model("Style", styleSchema);
