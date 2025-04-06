const express = require('express');
const router = express.Router();
const controller = require("../../controller/client/friend.controller")
router.get("/not-friend", controller.notFriend);

module.exports = router;