const mongoose = require("mongoose");
const patternSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pattern: { type: String, required: true },
});

module.exports = mongoose.model("Pattern", patternSchema);
