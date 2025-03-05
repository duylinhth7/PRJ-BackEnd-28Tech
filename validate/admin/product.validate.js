module.exports.createPost = (req, res, next) => {
    if(!req.body.title){
        res.redirect("back")
        return;
    }
    next();
};