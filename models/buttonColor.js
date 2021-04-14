const mongoose = require("mongoose");
const btnColorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  buttonColor: { type: String, required: true },
});

module.exports = mongoose.model("ButtonColor", btnColorSchema);
