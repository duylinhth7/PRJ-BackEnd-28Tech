const mongoose = require('mongoose');
const genarate = require("../helpers/genarate")

const usersSchema = new mongoose.Schema({

    fullName: String,
    email: String,
    phone: String,
    password: String,
    status: {
        type: String,
        default: "active"
    },
    tokenUser: {
        type: String,
        default: genarate(20)
    },
    deletedAt: Date,

}, { timestamps: true });

const Users = mongoose.model("Users", usersSchema, "users");

module.exports = Users;