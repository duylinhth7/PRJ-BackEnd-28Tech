const Users = require("../models/users.model")
module.exports = (res) => {
    const myId = res.locals.users.id;
    const fullName = res.locals.users.fullName;
    //seket.io
    _io.once('connection', (socket) => {
        //phần thêm bạn bè
        socket.on("CLIENT_ADD_FRIEND", async (userId) => {
            const exitsFriend = await Users.findOne({
                _id: myId,
                requestFriends: userId
            })
            if (!exitsFriend) {
                await Users.updateOne({ _id: myId }, { $push: { requestFriends: userId } })
                await Users.updateOne({ _id: userId }, { $push: { acceptFriends: myId } })
            }
        });
        //hết phần thêm bạn bè

        //phần hủy thêm bạn bè
        socket.on("CLIENT_CANCEL_ADD_FRIEND", async (userId) => {
            const exitsCancel = await Users.findOne({
                _id: myId, requestFriends: userId
            });
            if (exitsCancel) {
                await Users.updateOne({ _id: myId }, { $pull: { requestFriends: userId } })
                await Users.updateOne({ _id: userId }, { $pull: { acceptFriends: myId } })
            }
        })
        //hết phần hủy thêm bạn bè
    });
}