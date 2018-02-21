module.exports = router => {
  require("./book")(router);
  require("./user")(router);
};
