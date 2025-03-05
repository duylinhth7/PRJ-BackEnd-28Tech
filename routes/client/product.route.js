const express = require('express');
const router = express.Router();
const controller = require("../../controller/client/product.controller")
router.get("/products", controller.index);
router.get("/products/:slug", controller.detail);

module.exports = router;