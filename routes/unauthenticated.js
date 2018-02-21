const jwt = require("jsonwebtoken");
const { pick } = require("lodash");
const User = require("../models/user");
const config = require("../config");

module.exports = router => {
  router.post("/login", function(req, res, next) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (!user) {
          return next(new Error("Authentication failed. User not found."));
        } else if (user) {
          if (user.password !== req.body.password) {
            return next(new Error("Authentication failed. Wrong password."));
          } else {
            const { _id, fullname, email } = user;
            const payload = { _id, fullname, email };
            const token = jwt.sign(payload, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            });

            res.json({
              message: "Enjoy your token!",
              user: payload,
              token
            });
          }
        }
      })
      .catch(next);
  });

  router.post("/signup", (req, res, next) => {
    const obj = pick(req.body, ["fullname", "password", "email"]);
    const user = new User(obj);

    user
      .save()
      .then(user => res.json(user))
      .catch(next);
  });
};
