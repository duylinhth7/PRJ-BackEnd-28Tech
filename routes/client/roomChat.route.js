const express = require('express');
const router = express.Router();
const controller = require("../../controller/client/roomChat.controller");
// const chatMiddleware = require("../../middlewares/client/chat.middleware");
router.get("/", controller.index);

//[GET] /room-chat/create
router.get("/create", controller.create)
router.post("/create", controller.createPost)

module.exports = router;