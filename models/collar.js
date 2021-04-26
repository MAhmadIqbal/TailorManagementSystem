const mongoose = require("mongoose");
const collarSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  collarImage: { type: String, required: true },
  detail: { type: String },
});

module.exports = mongoose.model("Collar", collarSchema);

// const fabricSchema = new mongoose.Schema({
//     name:String,
//     collarDetail:String,
//     collarImage:String
// })
// module.exports = mongoose.model('Collar',fabricSchema)
