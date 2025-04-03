const Chat = require("../../models/chat.model")
const Users = require("../../models/users.model")
module.exports.index = async (req, res) => {
    const user = res.locals.users;
    const fullName = res.locals.users.fullName;
    //seket.io
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            const chat = new Chat({
                user_id: user.id,
                content: content
            })
            await chat.save();

            _io.emit("SERVER_RETURN_MESSAGE", {
                user_id: user.id,
                fullName: fullName,
                content: content
            })
        });
        socket.on("CLIENT_SEND_TYPING", (data) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                user_id: user.id,
                fullName: fullName,
                typing: data
            })
        })
    });
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