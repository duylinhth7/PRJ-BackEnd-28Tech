const express = require('express');
const multer = require('multer')


const fileUpload = multer();
const uploadCloud = require("../../middlewares/uploadCloud.middware");
const validate = require("../../validate/admin/product-category.validate");
const controller = require("../../controller/admin/productCategory.controller")

const router = express.Router();
router.get("/", controller.index);


router.get("/create", controller.create);

router.post("/create",
    fileUpload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost);




module.exports = router;