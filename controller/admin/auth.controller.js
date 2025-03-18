const Accounts = require("../../models/accounts.model");
const systemConfig = require("../../config/system")
const md5 = require('md5');


//[GET] admin/auth/login
module.exports.login = async (req, res) => {
    res.render("admin/pages/auth/login")
}
//[POST] admin/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email
    const account = await Accounts.findOne({email: email, deleted: false})
    if(!account){
        console.log("Email sai")
        res.redirect("back")
        return;
    }
    const passWord =  md5(req.body.passWord);
    if(passWord != account.passWord){
        console.log("Sai mật khẩu")
        res.redirect("back")
        return;
    }
    if(account.status == "inactive"){
        console.log("Tài khoản đã bị khóa")
        res.redirect("back")
        return;
    }
    res.cookie("token",  account.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}

//[GET] admin/auth/logout
module.exports.logout = async (req, res) => {
    res.clearCookie('token')
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}