const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// @NOTE: Owner of a user is the user itself
const userSchema = new Schema({
  fullname: String,
  password: String,
  email: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" }
});

userSchema.post("validate", function(doc, next) {
  doc.owner = doc._id;
  next();
});

// set up a mongoose model
module.exports = mongoose.model("User", userSchema);
