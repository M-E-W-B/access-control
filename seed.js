const { ObjectId } = require("mongoose").Types;
const { MongooseConnect } = require("./utils");
const User = require("./models/user");
const Group = require("./models/group");
const Book = require("./models/book");
const GroupMember = require("./models/group-member");
const Rule = require("./models/rule");

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
    owner: users[0]._id
  },
  {
    _id: ObjectId(),
    title: "Kieslowski on Kieslowski",
    author: "Krzysztof Kieslowski ",
    pageCount: 310,
    publication: "Faber & Faber",
    owner: users[1]._id
  },
  {
    _id: ObjectId(),
    title: "Sculpting in Time",
    author: "Andrei Tarkovsky",
    pageCount: 550,
    publication: "University of Texas Press",
    owner: users[1]._id
  }
];

const groups = [
  {
    _id: ObjectId(),
    name: "Administrator",
    owner: users[0]._id
  }
];

const groupMembers = [
  {
    _id: ObjectId(),
    groupId: groups[0]._id,
    userId: users[0]._id
  }
];

const rules = [
  // setting rules on Book
  {
    _id: ObjectId(),
    description: "Anything on a book",
    operation: "*",
    modelname: "Book",
    accessType: "GROUP",
    groupId: groups[0]._id
  },
  {
    _id: ObjectId(),
    description: "Update a book",
    operation: "UPDATE",
    modelname: "Book",
    accessType: "OWNER"
  },
  // setting rules on Group
  {
    _id: ObjectId(),
    description: "Anything on a group",
    operation: "*",
    modelname: "Group",
    accessType: "GROUP",
    groupId: groups[0]._id
  },
  // setting rules on User
  {
    _id: ObjectId(),
    description: "Anything on a user",
    operation: "*",
    modelname: "User",
    accessType: "GROUP",
    groupId: groups[0]._id
  },
  {
    _id: ObjectId(),
    description: "List groups of a user",
    operation: "LIST_USER_GROUPS",
    modelname: "User",
    accessType: "OWNER"
  },
  {
    _id: ObjectId(),
    description: "Read a user",
    operation: "READ",
    modelname: "User",
    accessType: "OWNER"
  },
  {
    _id: ObjectId(),
    description: "Update a user",
    operation: "UPDATE",
    modelname: "User",
    accessType: "OWNER"
  },
  // setting rules on Rule
  {
    _id: ObjectId(),
    description: "Anything on a rule",
    operation: "*",
    modelname: "Rule",
    accessType: "GROUP",
    groupId: groups[0]._id
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
