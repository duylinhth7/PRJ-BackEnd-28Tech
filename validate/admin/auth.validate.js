module.exports.login = (req, res, next) => {
    if(!req.body.email){
        res.redirect("back")
        return;
    }
    if(!req.body.passWord){
        res.redirect("back")
        return;
    }
    next();
};