const express = require('express');
const router = express.Router();
const multer = require("multer")
const controller = require("../../controller/admin/my-account.controller")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middware");
const validate = require("../../validate/admin/accounts.validate")


const upload = multer();
router.get("/", controller.index);
router.get("/edit", controller.edit);
router.patch("/edit",
    upload.single("avatar"),
    validate.editPatch,
    uploadCloud.upload,
    controller.editPatch);

module.exports = router;