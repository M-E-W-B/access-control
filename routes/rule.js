const { pick } = require("lodash");
const Rule = require("../models/rule");
const { checkPermission } = require("../utils");

module.exports = router => {
  // create a rule
  router.post("/rule", checkPermission("CREATE", "Rule"), (req, res, next) => {
    const obj = pick(req.body, [
      "description",
      "operation",
      "modelname",
      "accessType",
      "groupId",
      "userId"
    ]);

    obj.createdBy = req.decoded._id;

    const rule = new Rule(obj);

    rule
      .save()
      .then(rule => res.json(rule))
      .catch(next);
  });

  // delete a rule
  router.delete(
    "/rule/:id",
    checkPermission("DELETE", "Rule"),
    (req, res, next) => {
      const ruleId = req.params.id;

      Rule.remove({ _id: ruleId })
        .then(result => res.json(result))
        .catch(next);
    }
  );

  // update a rule
  router.put(
    "/rule/:id",
    checkPermission("UPDATE", "Rule"),
    (req, res, next) => {
      const ruleId = req.params.id;
      const options = { new: true };
      const obj = pick(req.body, [
        "description",
        "operation",
        "modelname",
        "accessType",
        "groupId",
        "userId"
      ]);

      Rule.findByIdAndUpdate(ruleId, obj, options)
        .then(rule => res.json(rule))
        .catch(next);
    }
  );

  // rule details
  router.get("/rule/:id", checkPermission("READ", "Rule"), (req, res, next) => {
    const ruleId = req.params.id;

    Rule.findById(ruleId)
      .then(rule => res.json(rule))
      .catch(next);
  });

  // list of rules
  router.get("/rule", checkPermission("LIST", "Rule"), (req, res, next) => {
    Rule.find({})
      .then(rules => res.json(rules))
      .catch(next);
  });
};
