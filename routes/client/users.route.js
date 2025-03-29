const express = require('express');
const router = express.Router();
const controller = require("../../controller/client/users.controller")
const userValidate = require("../../validate/client/user.validate")

router.get("/register", controller.register);
router.post("/register", userValidate.register, controller.registerPost);
router.get("/logout", controller.logout);
router.get("/login", controller.login);
router.post("/login", userValidate.login, controller.loginPost);
module.exports = router;