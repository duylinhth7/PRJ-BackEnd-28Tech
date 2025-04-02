const Settings = require("../../models/settings-general.model")

module.exports.general = async (req, res, next) => {
    const settings = await Settings.findOne({});
    if(settings){
        res.locals.settings = settings
    }
    next();
}