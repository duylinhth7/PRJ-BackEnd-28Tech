const Users = require("../../models/users.model")
module.exports.users = async (req, res, next) => {
    const users = await Users.findOne({
        tokenUser: req.cookies.tokenUser,
        status: "active"
    }).select("-password")
    if(users){
        res.locals.users = users
    }
    next();
}