const mongoose = require('mongoose');
const genarate = require("../helpers/genarate")

const usersSchema = new mongoose.Schema({

    fullName: String,
    email: String,
    phone: String,
    password: String,
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    tokenUser: {
        type: String,
        default: genarate.genarateToken(20)
    },
    requestFriends: Array,
    acceptFriends: Array,
    friendList: [
        {
            user_id: String,
            roomChat_id: String
        }
    ],
    deletedAt: Date,

}, { timestamps: true });

const Users = mongoose.model("Users", usersSchema, "users");

module.exports = Users;