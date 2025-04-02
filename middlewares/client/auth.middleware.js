const Users = require("../../models/users.model")
module.exports = async (req, res, next) => {

    const tokenUser = req.cookies.tokenUser;
    if (tokenUser) {
        const userLocals = await Users.findOne({ tokenUser: tokenUser });
        if (userLocals) {
            next();
        } else {
            res.redirect(`/users/login`)
        }
    } else {
        res.redirect(`/users/login`)
    }
}