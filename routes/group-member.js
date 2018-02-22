const { pick } = require("lodash");
const GroupMember = require("../models/group-member");
const { checkPermission } = require("../utils");

module.exports = router => {
  // add a user to a group
  router.post(
    "/group/:groupId/user/:userId",
    checkPermission("CREATE", "GroupMember"),
    (req, res, next) => {
      const { groupId, userId } = req.params;
      const obj = { groupId, userId };
      obj.createdBy = req.decoded._id;

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
    checkPermission("DELETE", "GroupMember"),
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
    checkPermission("LIST_GROUP_USERS", "GroupMember"),
    (req, res, next) => {
      const { groupId } = req.params;

      GroupMember.find({ groupId })
        .populate("userId")
        .then(users => res.json(users))
        .catch(next);
    }
  );

  // list all groups of which a user is member
  router.get(
    "/user/member/group",
    checkPermission("LIST_USER_GROUPS", "GroupMember"),
    (req, res, next) => {
      const userId = req.decoded._id;

      GroupMember.find({ userId })
        .populate("groupId")
        .then(groups => res.json(groups))
        .catch(next);
    }
  );
};
