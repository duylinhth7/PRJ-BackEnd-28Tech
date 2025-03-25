const express = require('express');
const multer = require('multer')

const fileUpload = multer();
const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middware");
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
    fileUpload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch);
router.get("/detail/:id", controller.detail);
module.exports = router;