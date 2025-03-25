const express = require("express");
const multer = require('multer')

const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middware");
const fileUpload = multer();
const controller = require("../../controller/admin/accounts.controller.js");
const validate = require("../../validate/admin/accounts.validate.js")

// const validate = require("../../validate/admin/")


router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create",
    fileUpload.single('avatar'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);
router.get("/edit/:id", controller.edit);

router.patch("/edit/:id",
    fileUpload.single('avatar'),
    uploadCloud.upload,
    validate.editPatch,
    controller.editPatch
);

module.exports = router;