const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// set up a mongoose model
// @NOTE: Owner of a book is the one who created it
module.exports = mongoose.model(
  "Book",
  new Schema({
    title: String,
    author: String,
    pageCount: Number,
    publication: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" }
  })
);
