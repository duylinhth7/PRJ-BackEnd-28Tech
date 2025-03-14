const roleModel = require("../../models/role.model");
const systemConfig = require("../../config/system");
const { model } = require("mongoose");


module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }
    const record = await roleModel.find(find);
    res.render("admin/pages/role/index.pug", {
        title: "Trang phân quyền Admin",
        record: record
    })
};

// [GET] admin/role/create
module.exports.create = (req, res) => {
    res.render("admin/pages/role/create", {
        title: "Trang tạo phân quyền mới"
    })
}
//end

// [POST] admin/role/create
module.exports.createPost = async (req, res) => {
    const record = new roleModel(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/role`);
}
//end

//[DELETE] admin/role/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    await roleModel.updateOne({ _id: id, deleted: true })
    res.redirect("back")
}
//END

//[GET] admin/role/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const record = await roleModel.findOne({ _id: id, deleted: false })
    res.render("admin/pages/role/edit", {
        title: "Trang chỉnh sửa nhóm quyền",
        record: record
    })
}
//END

//[PATCH] admin/role/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;
        await roleModel.updateOne({ _id: id }, req.body);
        res.redirect(`${systemConfig.prefixAdmin}/role`);

    } catch (error) {
        res.redirect("back");
    }
}