const systemConfig = require("../config/system");
const Accounts = require("../models/accounts.model");
module.exports.authRequire = async (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    } else {
        const user = await Accounts.findOne({token: req.cookies.token})
        if(user){
            next();
        } else {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        }
    }
}