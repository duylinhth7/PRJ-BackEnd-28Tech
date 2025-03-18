module.exports.createPost = (req, res, next) => {
    if(!req.body.fullName){
        res.redirect("back")
        return;
    }
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