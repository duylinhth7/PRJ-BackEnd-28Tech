const Chat = require("../models/chat.model")
const uploadToCloud = require("../helpers/uploadToCloud")
module.exports = (req, res) => {
    const user = res.locals.users;
    const fullName = res.locals.users.fullName;
    const roomChatId = req.params.roomChatId
    //seket.io
    _io.once('connection', (socket) => {
        socket.join(roomChatId);
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            let images = [];
            for (const image of data.images) {
                // console.log(image)
                link = await uploadToCloud(image);
                images.push(link)
            }
            const chat = new Chat({
                room_chat_id: roomChatId,
                user_id: user.id,
                content: data.content,
                images: images
            })
            await chat.save();

            _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
                user_id: user.id,
                fullName: fullName,
                content: data.content,
                images: images
            })
        });
        socket.on("CLIENT_SEND_TYPING", (data) => {
            socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
                user_id: user.id,
                fullName: fullName,
                typing: data
            })
        })
    });
}