const express = require("express");
const controller = require("../../controller/admin/settings.controller.js");
const router = express.Router();
const multer = require('multer')
const fileUpload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middware");


router.get("/general", controller.general);
router.patch("/general",
    fileUpload.single("logo"),
    uploadCloud.upload,
    controller.generalPatch,
)

module.exports = router;