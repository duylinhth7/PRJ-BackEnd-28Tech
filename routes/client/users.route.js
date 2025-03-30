const express = require('express');
const router = express.Router();
const controller = require("../../controller/client/users.controller")
const userValidate = require("../../validate/client/user.validate")

router.get("/register", controller.register);
router.post("/register", userValidate.register, controller.registerPost);
router.get("/logout", controller.logout);
router.get("/login", controller.login);
router.post("/login", userValidate.login, controller.loginPost);
router.get("/password/forget", controller.forgetPassword)
router.post("/password/forget", userValidate.forgetPassword, controller.forgetPasswordPost)
router.get("/password/otp", controller.forgetPasswordOtp)
router.post("/password/otp", userValidate.authenticOtp, controller.forgetPasswordOtpPost)
router.get("/password/reset", controller.resetPassword)
router.post("/password/reset", userValidate.resetPassword, controller.resetPasswordPost)
module.exports = router;