const express = require('express');
const multer = require('multer')


const fileUpload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middware");
const validate = require("../../validate/admin/product-category.validate");
const controller = require("../../controller/admin/productCategory.controller")

const router = express.Router();
router.get("/", controller.index);


router.get("/create", controller.create);

router.patch("/change-status/:status/:id", controller.changeStatusCategory);
router.delete("/delete/:id", controller.deleteItem);
router.patch("/change-mutil", controller.changeMutil)
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id",
    fileUpload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch
)

router.post("/create",
    fileUpload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost);




module.exports = router;