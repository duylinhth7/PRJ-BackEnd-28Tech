const Chat = require("../../models/chat.model")
const Users = require("../../models/users.model")
const chatSocket = require("../../sockets/chat.socket")
module.exports.index = async (req, res) => {
    const user = res.locals.users;
    const fullName = res.locals.users.fullName;
    //seket.io
    chatSocket(res);
    //end seket.io
    const chats = await Chat.find({ deleted: false });
    for (const chat of chats) {
        const user = await Users.findOne({ _id: chat.user_id }).select("fullName")
        chat.fullName = user.fullName;
    }
    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats
    })
}