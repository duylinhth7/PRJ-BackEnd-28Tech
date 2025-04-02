const mongoose = require('mongoose');


const settingsGeneralSchema = new mongoose.Schema({
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    coppyright: String

}, { timestamps: true });
const SettingsGeneral = mongoose.model("SettingsGeneral", settingsGeneralSchema, "settings-general");

module.exports = SettingsGeneral;