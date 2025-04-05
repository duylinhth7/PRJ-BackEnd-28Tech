const Chat = require("../../models/chat.model")
const Users = require("../../models/users.model")
const uploadToCloud = require("../../helpers/uploadToCloud")
module.exports.index = async (req, res) => {
    const user = res.locals.users;
    const fullName = res.locals.users.fullName;
    //seket.io
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            let images = [];
            for (const image of data.images) {
                // console.log(image)
                link = await uploadToCloud(image);
                images.push(link)
            }
            const chat = new Chat({
                user_id: user.id,
                content: data.content,
                images: images
            })
            await chat.save();

            _io.emit("SERVER_RETURN_MESSAGE", {
                user_id: user.id,
                fullName: fullName,
                content: data.content,
                images: images
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