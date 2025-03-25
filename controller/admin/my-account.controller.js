const Accounts = require("../../models/accounts.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
//[GET] admin/my-account
module.exports.index = (req, res) => {
    res.render("admin/pages/my-account/index",
        {
            title: "Thông tin tài khoản"
        }
    )
}

//[GET] admin/my-account/edit
module.exports.edit = (req, res) => {
    res.render("admin/pages/my-account/edit", {
        title: "Chỉnh sửa thông tin"
    })
}

//[PATCH] admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    try {
        const check = await Accounts.findOne({
            _id: { $ne: res.locals.user.id },
           email: req.body.email,
           deleted: false
       })
    if (check) {
        console.log("email đã tồn tại");
        return res.redirect("back")
    } else {
        if (req.body.passWord) {
            req.body.passWord = md5(req.body.passWord);
        } else {
            delete req.body.passWord;
        }
    }
    await Accounts.updateOne({ _id: res.locals.user.id }, req.body)
    res.redirect(`${systemConfig.prefixAdmin}/my-account`);
} catch (error) {
    res.redirect("back");
}
} 