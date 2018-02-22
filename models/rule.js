const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// set up a mongoose model
// @TODO: try with discriminator https://anthonychu.ca/post/cosmos-db-mongoose-discriminators/
module.exports = mongoose.model(
  "Rule",
  new Schema({
    description: String,
    operation: {
      type: String,
      enum: [
        "CREATE",
        "READ",
        "UPDATE",
        "DELETE",
        "LIST",
        "LIST_USER_GROUPS",
        "LIST_GROUP_USERS"
      ]
    },
    modelname: String,
    accessType: {
      type: String,
      enum: ["GLOBAL", "OWNER", "GROUP", "USER"]
    },
    groupId: { type: Schema.Types.ObjectId, ref: "Group" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }
  })
);
