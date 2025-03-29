const md5 = require("md5")
require('cookie-parser')
const Users = require("../../models/users.model")
// [GET] /users/register
module.exports.register = async (req, res) => {
    res.render("client/pages/users/register", {
        pageTitle: "Trang đăng ký"
    })
}

// [POST] /users/register
module.exports.registerPost = async (req, res) => {
    const checkEmail = await Users.findOne({
        email: req.body.email
    })
    if(checkEmail){
        res.redirect("back")
        return;
    }
    req.body.password = md5(req.body.password);
    const user = new Users(req.body);
    await user.save();
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/")
}

//[GET] /users/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/")
}

//[GET] /users/login
module.exports.login = async (req, res) => {
    res.render("client/pages/users/login", {
        pageTitle: "Trang đăng nhập"
    })
}

//[POST] /users/login
module.exports.loginPost = async (req, res) => {
    const checkLogin = await Users.findOne({
        email: req.body.email
    })
    if(!checkLogin){
        console.log("Email sai!")
        res.redirect("back");
        return;
    }
    if(checkLogin.status != "active"){
        console.log("Tài khoản đã bị khóa");
        res.redirect("back");
        return;
    }
    if(md5(req.body.password) != checkLogin.password){
        console.log("Sai mật khẩu!");
        res.redirect("back");
        return;
    }
    res.cookie("tokenUser", checkLogin.tokenUser);
    res.redirect("/");

}
