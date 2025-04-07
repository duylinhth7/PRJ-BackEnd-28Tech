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

        //phần chấp nhận kết bạn
        socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
            const exitsAccept = await Users.findOne({
                _id: myId, acceptFriends: userId
            })
            if (exitsAccept) {
                //xóa id của người gửi lời mời ra khỏi acceptFriends của người đồng ý đồng thời thêm id vào friendList
                await Users.updateOne({ _id: myId },
                    {
                        $pull: { acceptFriends: userId },
                        $addToSet: { friendList: {
                            user_id: userId,
                            roomChat_id: ""
                        } }
                    }
                )
                //xóa id của người đồng ý ra khỏi requestFriends của người gửi lời mời đồng thời thêm id vào friendList
                await Users.updateOne({ _id: userId },
                    {
                        $pull: { requestFriends: myId },
                        $addToSet: { friendList: {
                            user_id: myId,
                            roomChat_id: ""
                        }}
                    }
                )
            }
        })
        // hết phần chấp nhận kết bạn

        //phần từ chối lời mời kết bạn
        socket.on("CLIENT_CANCEL_ACCEPT", async (userId) => {
            //xóa id của người gửi lời mời ra khỏi acceptFriend của người reject
            await Users.updateOne({_id: myId}, {$pull: {acceptFriends: userId}})
            //xóa id của người reject ra khỏi requestFriend của nguoif gửi lời mời
            await Users.updateOne({_id: userId}, {$pull: {requestFriends: myId}})
        })
        //hết phần từ chối lời mời kết bạn
    });
}