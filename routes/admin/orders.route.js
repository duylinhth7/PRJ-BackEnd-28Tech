const express = require('express');
const router = express.Router();
const controller = require("../../controller/admin/orders.controller")


router.get("/", controller.index);
router.patch("/changeStatus/:id/:status", controller.changeStatus);
router.get("/detail/:id", controller.detail)

module.exports = router;