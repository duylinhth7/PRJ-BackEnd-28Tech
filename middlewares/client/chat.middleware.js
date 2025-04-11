const Users = require("../../models/users.model");
module.exports.chat = async (req, res, next) => {
    const userId = res.locals.users.id;
    const roomChatId = req.params.roomChatId;
    const checkRoomChat = await Users.findOne({
        _id: userId,
        status: "active",
        "friendList.roomChat_id": roomChatId
    });
    if(checkRoomChat){
        next();
    } else {
        res.redirect("/")
    }
}