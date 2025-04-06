const Users = require("../../models/users.model");
const friendSocket = require("../../sockets/friend.socket")
module.exports.notFriend = async (req, res) => {
    //socket
    friendSocket(res);
    //end socket
    const myId = res.locals.users.id;
    const myUser = await Users.findOne({ _id: myId });
    const requestFriends = myUser.requestFriends
    const userList = await Users.find({
        $and: [
            { _id: { $ne: (myId) } },
            { _id: { $nin: requestFriends } }, 
            { status: "active" }
        ]
    }
    ).select("fullName avatar id")
    res.render("client/pages/friend/notFriend", {
        pageTitle: "Danh sách người dùng",
        notFriend: userList
    })
}