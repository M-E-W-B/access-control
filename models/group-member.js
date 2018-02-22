const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model(
  "GroupMember",
  new Schema({
    groupId: { type: Schema.Types.ObjectId, ref: "Group" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }
  })
);
