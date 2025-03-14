const express = require("express");
const controller = require("../../controller/admin/role.controller.js");
const router = express.Router();

// const validate = require("../../validate/admin/")


router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.createPost);
router.delete("/delete/:id", controller.delete);
router.get("/edit/:id", controller.edit)
router.patch("/edit/:id", controller.editPatch)

module.exports = router;