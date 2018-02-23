const { pick } = require("lodash");
const User = require("../models/user");
const { checkPermission } = require("../utils");

module.exports = router => {
  // delete a user
  router.delete(
    "/user/:id",
    checkPermission("DELETE", "User", req => req.params.id),
    (req, res, next) => {
      const userId = req.params.id;

      User.remove({ _id: userId })
        .then(result => res.json(result))
        .catch(next);
    }
  );

  // get a user
  // @TODO
  router.get(
    "/user/:id",
    checkPermission("READ", "User", req => req.params.id),
    (req, res, next) => {
      const userId = req.params.id;

      User.findById(userId)
        .then(user => res.json(user))
        .catch(next);
    }
  );

  // edit a user
  router.put(
    "/user/:id",
    checkPermission("UPDATE", "User", req => req.params.id),
    (req, res, next) => {
      const userId = req.params.id;
      const options = { new: true };
      const obj = pick(req.body, ["fullname"]);

      User.findByIdAndUpdate(userId, obj, options)
        .then(user => res.json(user))
        .catch(next);
    }
  );

  // get all users
  router.get("/user", checkPermission("LIST", "User"), (req, res, next) => {
    User.find({})
      .then(users => res.json(users))
      .catch(next);
  });
};
