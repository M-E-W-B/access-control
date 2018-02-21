const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model(
  "Book",
  new Schema({
    title: String,
    author: String,
    pageCount: Number,
    publication: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }
  })
);
