const Settings = require("../../models/settings-general.model")
// [GET] admin/settings/general
module.exports.general = async (req, res) => {
    const settings = await Settings.findOne({});
    res.render("admin/pages/settings/general", {
        title: "Trang cài đặt chung",
        settings: settings
    })
}

//[PATCH] admin/settings/general
module.exports.generalPatch = async (req, res) => {
    const settings = await Settings.countDocuments({});
    const settingsUpdate = await Settings.findOne({});
    if(settings === 0) {
        const newSettings = new Settings(req.body);
        await newSettings.save();
        res.redirect("back")
    } else {
       await Settings.updateOne({_id: settingsUpdate.id}, req.body)
       res.redirect("back")
    }
}