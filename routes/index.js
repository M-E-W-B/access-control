module.exports = router => {
  require("./book")(router);
  require("./group")(router);
  require("./rule")(router);
  require("./group-member")(router);
  require("./user")(router);
};
