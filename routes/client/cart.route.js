const express = require('express');
const router = express.Router();
const controller = require("../../controller/client/cart.controller")
router.get("/", controller.index);
router.post("/:id", controller.cartPost);
router.get("/delete/:id", controller.delete)
router.get("/update/:quantity/:id", controller.update)
module.exports = router;