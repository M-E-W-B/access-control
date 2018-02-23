const { pick } = require("lodash");
const GroupMember = require("../models/group-member");
const { checkPermission } = require("../utils");

module.exports = router => {
  // add a user to a group
  router.post(
    "/group/:groupId/user/:userId",
    checkPermission("CREATE", "Group", req => req.params.groupId),
    (req, res, next) => {
      const { groupId, userId } = req.params;
      const obj = { groupId, userId };
      const groupMember = new GroupMember(obj);

      groupMember
        .save()
        .then(groupMember => res.json(groupMember))
        .catch(next);
    }
  );

  // remove a user from a group
  router.delete(
    "/group/:groupId/user/:userId",
    checkPermission("DELETE", "Group", req => req.params.groupId),
    (req, res, next) => {
      const { groupId, userId } = req.params;

      GroupMember.remove({ groupId, userId })
        .then(result => res.json(result))
        .catch(next);
    }
  );

  // list all users of a group
  router.get(
    "/group/:groupId/user",
    checkPermission("LIST_GROUP_USERS", "Group", req => req.params.groupId),
    (req, res, next) => {
      const { groupId } = req.params;

      GroupMember.find({ groupId })
        .populate("userId")
        .then(users => res.json(users))
        .catch(next);
    }
  );

  // list all groups of a user
  router.get(
    "/user/:userId/group",
    checkPermission("LIST_USER_GROUPS", "User", req => req.params.userId),
    (req, res, next) => {
      const { userId } = req.params;

      GroupMember.find({ userId })
        .populate("groupId")
        .then(groups => res.json(groups))
        .catch(next);
    }
  );
};
