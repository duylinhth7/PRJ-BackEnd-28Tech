const RoomChat = require("../../models/roomChat.model")
const Users = require("../../models/users.model")

module.exports.index = async (req, res) => {
    const myId = res.locals.users.id
    const roomChat = await RoomChat.find({
        typeRoom: "group",
        "users.user_id": myId
    });
    res.render("client/pages/roomChat/index", {
        pageTitle: "Danh sách nhóm Chat",
        roomChat: roomChat
    })
}

//[GET] /room-chat/create
module.exports.create = async (req, res) => {
    const listFriend = res.locals.users.friendList;
    for (const friend of listFriend) {
        const infoFriend = await Users.findOne({
            _id: friend.user_id,
            status: "active"
        }).select("fullName avatar");
        friend.infoFriend= infoFriend;
    }
    res.render("client/pages/roomChat/create", {
        pageTitle: "Tạo nhóm Chat mới",
        listFriend: listFriend
    })
}

//[POST] /room-chat/create
module.exports.createPost = async (req, res) => {
    if(req.body){
        const roomChat = {
            title: req.body.title,
            users: [],
            typeRoom: "group"
        }
        for (const item of req.body.user_id) {
            roomChat.users.push({
                user_id: item,
                role: "notAdmin"
            })
        };
        roomChat.users.push({
            user_id: res.locals.users.id,
            role: "admin"
        });
        const newRoomChat = new RoomChat(roomChat);
        await newRoomChat.save();
        res.redirect(`/chat/${newRoomChat.id}`);
    }
}