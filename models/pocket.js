const mongoose = require("mongoose");
const pocketSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  pocket: { type: String, required: true },
});

module.exports = mongoose.model("Pocket", pocketSchema);
