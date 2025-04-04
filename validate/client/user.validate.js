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

module.exports.forgetPassword = (req, res, next) => {
    if(!req.body.email){
        res.send("403 not found page!")
        return;
    }
    next();
}

module.exports.authenticOtp = (req, res, next) => {
    if(!req.body.email){
        res.send("403 Not Found Page!");
        return;
    }
    if(!req.body.otp){
        res.send("403 Not Found Page!");
        return;
    }
    next();
}

module.exports.resetPassword = (req, res, next) => {
    if(!req.body.password){
        res.redirect("back");
        return;
    }
    if(!req.body.confimPassword){
        res.redirect("back");
        return;
    }
    if(req.body.password != req.body.confimPassword){
        res.redirect("back");
        return;
    }
    next();
}