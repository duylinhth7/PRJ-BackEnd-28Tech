const roleModel = require("../../models/role.model");
const Accounts = require("../../models/accounts.model");
const genarateToken = require("../../helpers/genarate")
const systemConfig = require("../../config/system")
const md5 = require('md5');

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const record = await Accounts.find(find).select("-token -passWord")
    for (const item of record) {
        const role = await roleModel.findOne({deleted: false, _id: item.role_id});
        item.role = role
    }
    res.render("admin/pages/accounts/index", {
        title: "Trang danh sách tài khoản",
        record: record
    })
}

// [GET] admin/accounts/create
module.exports.create = async (req, res) => {
    const role = await roleModel.find({ deleted: false })
    res.render("admin/pages/accounts/create", {
        title: "Trang tạo mới tài khoản",
        role: role
    })
}

// [POST] admin/accounts/create
module.exports.createPost = async (req, res) => {
    req.body.token = genarateToken(20);
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
}