const mongoose = require("mongoose");
const cuffSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  cuffImage: { type: String, required: true },
  detail: { type: String },
});

module.exports = mongoose.model("Cuff", cuffSchema);
