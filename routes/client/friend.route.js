const express = require('express');
const router = express.Router();
const controller = require("../../controller/client/friend.controller")
router.get("/not-friend", controller.notFriend);
router.get("/request-friend", controller.requestFriend)
router.get("/accept-friend", controller.acceptFriend)
router.get("/has-friend", controller.listFriend)

module.exports = router;