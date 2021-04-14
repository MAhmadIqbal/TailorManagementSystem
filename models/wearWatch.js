const mongoose = require("mongoose");
const wearWatchSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  wearWatch: { type: String, required: true },
});

module.exports = mongoose.model("WearWatch", wearWatchSchema);
