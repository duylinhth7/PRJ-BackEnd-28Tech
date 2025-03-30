const md5 = require("md5")
require('cookie-parser')
const Users = require("../../models/users.model");
const genarate = require("../../helpers/genarate");
const ForgetPassword = require("../../models/forget-password.model");
const sendMailHelper = require("../../helpers/sendMail");
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
    if (checkEmail) {
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
    if (!checkLogin) {
        console.log("Email sai!")
        res.redirect("back");
        return;
    }
    if (checkLogin.status != "active") {
        console.log("Tài khoản đã bị khóa");
        res.redirect("back");
        return;
    }
    if (md5(req.body.password) != checkLogin.password) {
        console.log("Sai mật khẩu!");
        res.redirect("back");
        return;
    }
    res.cookie("tokenUser", checkLogin.tokenUser);
    res.redirect("/");

}

//[GET] /users/password/forget
module.exports.forgetPassword = async (req, res) => {
    res.render("client/pages/users/forget-password")
}

//[POST] /users/password/forget
module.exports.forgetPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = genarate.genarateNumber(5);
    const checkEmail = await Users.findOne({
        email: req.body.email
    })
    if (!checkEmail) {
        console.log("Email không tồn tại!")
        res.redirect("back")
        return;
    }
    if (checkEmail.status != "active") {
        console.log("Tài khoản đã bị khóa!");
        res.redirect("back")
        return;
    }
    const objectForgetPassword = {
        email: email,
        otp:  otp,
        expireAt: Date.now()
    };
    const forgetPassword = new ForgetPassword(objectForgetPassword);
    await forgetPassword.save();

    //Gửi mail xác nhận OTP;
    const subject = "Mã OTP xác minh đặt lại mật khẩu!";
    const html = `Mã OTP để cập nhật lại mật khẩu là <b>${otp}</b>. Thời hạn của mã OTP này là 1 phút!`
    sendMailHelper.sendMail(email, subject, html);

    res.redirect(`/users/password/otp?email=${email}`);
    
}

//[GET] /users/password/otp
module.exports.forgetPasswordOtp = async (req, res) => {
    res.render("client/pages/users/otp.pug", {
        pageTitle: "Trang xác thực OTP",
        email: req.query.email
    })
}
//[POST] /users/password/otp
module.exports.forgetPasswordOtpPost = async (req, res) => {
    const checkOtp = await ForgetPassword.findOne({
        email: req.body.email,
        otp: req.body.otp
    })
    if(!checkOtp){
        console.log("Sai mã OTP");
        res.redirect("back")
    } else {
        const user = await Users.findOne({
            email: req.body.email
        });
        res.cookie("tokenUser", user.tokenUser);
        res.redirect(`/users/password/reset`)
    }
}

//[GET] /users/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/users/resetPassword", {
        pageTitle: "Trang đặt lại mật khẩu"
    })
}

//[POST] /users/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    const tokenUser = req.cookies.tokenUser;
    const newPassword = md5(req.body.password)
    await Users.updateOne({tokenUser: tokenUser}, {password: newPassword})
    res.redirect("/");
}