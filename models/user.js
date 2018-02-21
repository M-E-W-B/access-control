const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model(
  "User",
  new Schema({
    fullname: String,
    password: String,
    email: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }
  })
);
