module.exports.register = (req, res, next) => {
    if(!req.body.fullName){
        res.redirect("back")
        return;
    }
    if(!req.body.phone){
        res.redirect("back")
        return;
    }
    if(!req.body.email){
        res.redirect("back")
        return;
    }
    if(!req.body.password){
        res.redirect("back")
        return;
    }
    next();
};

module.exports.login = (req, res, next) => {
    if(!req.body.email){
        res.redirect("back")
        return;
    }
    if(!req.body.password){
        res.redirect("back")
        return;
    }
    next();
};