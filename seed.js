const mongoose = require("mongoose");
const { MongooseConnect } = require("./utils");
const User = require("./models/user");
const Group = require("./models/group");
const Book = require("./models/book");
const GroupMember = require("./models/group-member");
const Rule = require("./models/rule");

const ObjectId = mongoose.Types.ObjectId;
const users = [
  {
    _id: ObjectId(),
    fullname: "Evan Austin",
    password: "yahoo",
    email: "evan@yahoo.com"
  },
  {
    _id: ObjectId(),
    fullname: "Rhonda Newman",
    password: "yahoo",
    email: "rhonda@yahoo.com"
  },
  {
    _id: ObjectId(),
    fullname: "Nellie	Lambert",
    password: "yahoo",
    email: "nellie@yahoo.com"
  }
];

const books = [
  {
    _id: ObjectId(),
    title: "Herzog on Herzog",
    author: "Werner Herzog",
    pageCount: 430,
    publication: "Faber & Faber",
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    title: "Kieslowski on Kieslowski",
    author: "Krzysztof Kieslowski ",
    pageCount: 310,
    publication: "Faber & Faber",
    createdBy: users[1]._id
  },
  {
    _id: ObjectId(),
    title: "Sculpting in Time",
    author: "Andrei Tarkovsky",
    pageCount: 550,
    publication: "University of Texas Press",
    createdBy: users[1]._id
  }
];

const groups = [
  {
    _id: ObjectId(),
    name: "Administrator",
    createdBy: users[0]._id
  }
];

const groupMembers = [
  {
    _id: ObjectId(),
    groupId: groups[0]._id,
    userId: users[0]._id,
    createdBy: users[0]._id
  }
];

const rules = [
  // setting rules on Book
  {
    _id: ObjectId(),
    description: "Create a book",
    operation: "CREATE",
    modelname: "Book",
    accessType: "GLOBAL",
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Read a book",
    operation: "READ",
    modelname: "Book",
    accessType: "GLOBAL",
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Update a book",
    operation: "UPDATE",
    modelname: "Book",
    accessType: "OWNER",
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Delete a book",
    operation: "DELETE",
    modelname: "Book",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Delete a book",
    operation: "DELETE",
    modelname: "Book",
    accessType: "OWNER",
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "List all books",
    operation: "LIST",
    modelname: "Book",
    accessType: "GLOBAL",
    createdBy: users[0]._id
  },
  // setting rules on Group
  {
    _id: ObjectId(),
    description: "Create a group",
    operation: "CREATE",
    modelname: "Group",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Read a group",
    operation: "READ",
    modelname: "Group",
    accessType: "GLOBAL",
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Update a group",
    operation: "UPDATE",
    modelname: "Group",
    accessType: "OWNER",
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Delete a group",
    operation: "DELETE",
    modelname: "Group",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "List all groups",
    operation: "LIST",
    modelname: "Group",
    accessType: "GLOBAL",
    createdBy: users[0]._id
  },
  // setting rules on GroupMember
  {
    _id: ObjectId(),
    description: "Create a groupmember",
    operation: "CREATE",
    modelname: "GroupMember",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Delete a groupmember",
    operation: "DELETE",
    modelname: "GroupMember",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "List users of a group",
    operation: "DELETE",
    modelname: "GroupMember",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "List groups of a user",
    operation: "DELETE",
    modelname: "GroupMember",
    accessType: "OWNER",
    createdBy: users[0]._id
  },
  // setting rules on User
  {
    _id: ObjectId(),
    description: "Read a user",
    operation: "READ",
    modelname: "User",
    accessType: "OWNER",
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Update a user",
    operation: "UPDATE",
    modelname: "User",
    accessType: "OWNER",
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Delete a user",
    operation: "DELETE",
    modelname: "User",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "List all users",
    operation: "LIST",
    modelname: "User",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  },
  // setting rules on Rule
  {
    _id: ObjectId(),
    description: "Create a rule",
    operation: "CREATE",
    modelname: "Rule",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Read a rule",
    operation: "READ",
    modelname: "Rule",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Update a rule",
    operation: "UPDATE",
    modelname: "Rule",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "Delete a rule",
    operation: "DELETE",
    modelname: "Rule",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  },
  {
    _id: ObjectId(),
    description: "List all rules",
    operation: "LIST",
    modelname: "Rule",
    accessType: "GROUP",
    groupId: groups[0]._id,
    createdBy: users[0]._id
  }
];

MongooseConnect.open().then(async function() {
  await User.remove({});
  await User.insertMany(users);
  console.log("Users added! 🐸");

  await Group.remove({});
  await Group.insertMany(groups);
  console.log("Groups added! 🐸");

  await Book.remove({});
  await Book.insertMany(books);
  console.log("Books added! 🐸");

  await GroupMember.remove({});
  await GroupMember.insertMany(groupMembers);
  console.log("GroupMembers added! 🐸");

  await Rule.remove({});
  await Rule.insertMany(rules);
  console.log("Rules added! 🐸");

  // MongooseConnect.close();
});
