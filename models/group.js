const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model(
  "Group",
  new Schema({
    name: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }
  })
);
