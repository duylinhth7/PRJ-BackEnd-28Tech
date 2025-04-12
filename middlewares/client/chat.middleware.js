// const Users = require("../../models/users.model");
const RoomChat = require("../../models/roomChat.model");
module.exports.chat = async (req, res, next) => {
    try {
        const userId = res.locals.users.id;
        const roomChatId = req.params.roomChatId;
        const checkRoomChat = await RoomChat.findOne({
            _id: roomChatId,
            deleted: false,
            "users.user_id": userId
        })
        if (checkRoomChat) {
            next();
        } else {
            res.redirect("/")
        }
    } catch (error) {
        res.redirect("/")
    }
}