const systemConfig = require("../../config/system");
const Accounts = require("../../models/accounts.model");
const roleModel = require("../../models/role.model")
module.exports.authRequire = async (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    } else {
        const user = await Accounts.findOne({token: req.cookies.token}).select(" -passWord -token")
        if(user){
            res.locals.user = user;
            const role_id = user.role_id;
            const role = await roleModel.findOne({_id: role_id}).select("title permissions")
            res.locals.role = role;
            next();
        } else {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        }
    };
}