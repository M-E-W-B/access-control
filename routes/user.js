const User = require("../models/user");
const { pick } = require("lodash");

module.exports = router => {
  // delete a user
  router.delete("/user/:id", (req, res, next) => {
    const userId = req.params.id;

    User.remove({ _id: userId })
      .then(result => res.json(result))
      .catch(next);
  });

  // get a user
  router.get("/user/:id", (req, res, next) => {
    const userId = req.params.id;

    User.findById(userId)
      .then(user => res.json(user))
      .catch(next);
  });

  // edit a user
  router.put("/user/:id", (req, res, next) => {
    const userId = req.params.id;
    const options = { new: true };
    const obj = pick(req.body, ["fullname"]);

    User.findByIdAndUpdate(userId, obj, options)
      .then(user => res.json(user))
      .catch(next);
  });

  // get all users
  router.get("/user", (req, res, next) => {
    User.find({})
      .then(users => res.json(users))
      .catch(next);
  });
};
