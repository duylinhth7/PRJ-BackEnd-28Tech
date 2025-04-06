const Chat = require("../models/chat.model")
const uploadToCloud = require("../helpers/uploadToCloud")
module.exports = (res) => {
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
}