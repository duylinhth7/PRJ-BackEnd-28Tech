const express = require("express");
const controller = require("../../controller/admin/auth.controller.js");
const router = express.Router();

// const validate = require("../../validate/admin/")


router.get("/login", controller.login);
router.post("/login", controller.loginPost);
router.get("/logout", controller.logout)

module.exports = router;