const express = require('express');
const router = express.Router();
const controller = require("../../controller/client/product.controller")
router.get("/", controller.index);
router.get("/:slugCategory", controller.productCategory)
router.get("/detail/:slug", controller.detail);

module.exports = router;