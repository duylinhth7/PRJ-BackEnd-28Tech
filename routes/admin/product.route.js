const express = require('express');
const multer = require('multer')

const storageMulter = require('../../helpers/storageMulter');
const upload = multer({ storage: storageMulter });
const fileUpload = multer();
const router = express.Router();
const uploadCloud = require("../../middlewares/uploadCloud.middware");
const validate = require("../../validate/admin/product.validate");
const controller = require("../../controller/admin/product.controller")
router.get("/", controller.product);


router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-mutil", controller.changeMutil);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.create);
router.post("/create",
    fileUpload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id",
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch);
router.get("/detail/:id", controller.detail);
module.exports = router;