const Rule = require("../models/rule");
const GroupMember = require("../models/group-member");

module.exports = (operation, modelname) => {
  return async function(req, res, next) {
    const userId = req.decoded._id;
    const groupMembers = await GroupMember.find({ userId });
    const groupIds = groupMembers.map(gm => gm.groupId);

    const rules = await Rule.find({
      operation,
      modelname,
      $or: [
        { accessType: "GLOBAL" },
        { accessType: "OWNER", createdBy: userId },
        { accessType: "GROUP", groupId: { $in: groupIds } },
        { accessType: "USER", userId }
      ]
    });

    // console.log(userId);
    // console.log(groupIds);
    // console.log(rules);

    if (rules.length) next();
    else next(new Error("Unauthorized access"));
  };
};
