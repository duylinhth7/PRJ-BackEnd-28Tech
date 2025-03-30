const roleModel = require("../../models/role.model");
const Accounts = require("../../models/accounts.model");
const genarate = require("../../helpers/genarate")
const systemConfig = require("../../config/system")
const md5 = require('md5');

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const record = await Accounts.find(find).select("-token -passWord")
    for (const item of record) {
        const role = await roleModel.findOne({ deleted: false, _id: item.role_id });
        item.role = role
    }
    res.render("admin/pages/accounts/index", {
        title: "Trang danh sách tài khoản",
        record: record
    })
}

// [GET] admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await roleModel.find({ deleted: false })
    res.render("admin/pages/accounts/create", {
        title: "Trang tạo mới tài khoản",
        roles: roles
    })
}

// [POST] admin/accounts/create
module.exports.createPost = async (req, res) => {
    if (res.locals.role.permissions.includes("accounts_add")) {
        req.body.token = genarate.genarateToken(20);
        req.body.passWord = md5(req.body.passWord)
        const check = await Accounts.findOne({
            deleted: false,
            email: req.body.email
        });
        if (check) {
            res.redirect("back")
        } else {
            const newAccount = new Accounts(req.body);
            await newAccount.save();
            res.redirect(`${systemConfig.prefixAdmin}/accounts`);
        }
    } else {
        return res.send("403!")
    }
}

//[GET] admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const roles = await roleModel.find({ deleted: false })
    const record = await Accounts.findOne({ deleted: false, _id: id })
    res.render("admin/pages/accounts/edit", {
        title: "Trang chỉnh sửa tài khoản",
        record: record,
        roles: roles
    })
}
//[PATCH] admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    if (res.locals.role.permissions.includes("accounts_edit")) {
        const id = req.params.id;
        const check = await Accounts.findOne({
            _id: { $ne: id },
            email: req.body.email,
            deleted: false
        })
        if (check) {
            res.redirect("back")
        } else {
            if (req.body.passWord) {
                req.body.passWord = md5(req.body.passWord)
            } else {
                delete req.body.passWord
            }
        }
        await Accounts.updateOne({ _id: id }, req.body);
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    } else{
        res.send("403!")
    }


}
