const Users = require("../../models/users.model");
const friendSocket = require("../../sockets/friend.socket")

//[GET] /friend/not-friend
module.exports.notFriend = async (req, res) => {
    //socket
    friendSocket(res);
    //end socket
    const myId = res.locals.users.id;
    const myUser = await Users.findOne({ _id: myId });
    const requestFriends = myUser.requestFriends
    const acceptFriends = myUser.acceptFriends
    let friendList = [];
    myUser.friendList.map(item => {
        friendList.push(item.user_id)
    });
    const userList = await Users.find({
        $and: [
            { _id: { $ne: (myId) } },
            { _id: { $nin: requestFriends } },
            { _id: { $nin: acceptFriends } },
            { _id: { $nin: friendList } },
            { status: "active" }
        ]
    }
    ).select("fullName avatar id");
    res.render("client/pages/friend/notFriend", {
        pageTitle: "Danh sách người dùng",
        notFriend: userList
    })
}

//[GET] /friend/request-friend
module.exports.requestFriend = async (req, res) => {

    //socket
    friendSocket(res);
    // end socket
    const myId = res.locals.users.id;
    const myUser = await Users.findOne({ _id: myId });
    const requestFriends = myUser.requestFriends
    const userList = await Users.find({
        $and: [
            { _id: { $ne: (myId) } },
            { _id: { $in: requestFriends } },
            { status: "active" }
        ]
    }
    ).select("fullName avatar id");
    res.render("client/pages/friend/requestFriend", {
        pageTitle: "Lời mời đã gửi",
        requestFriends: userList
    })
}

//[GET] /friend/accept-friend
module.exports.acceptFriend = async (req, res) => {
    //socket
    friendSocket(res);
    //end socket
    const myId = res.locals.users.id;
    const myUser = await Users.findOne({ _id: myId });
    const acceptFriends = myUser.acceptFriends
    const userList = await Users.find({
        $and: [
            { _id: { $ne: (myId) } },
            { _id: { $in: acceptFriends } },
            { status: "active" }
        ]
    }
    ).select("fullName avatar id");
    res.render("client/pages/friend/acceptFriend", {
        pageTitle: "Lời mời kết bạn",
        acceptFriends: userList
    })
}

//GET /friend/list-friend
module.exports.listFriend = async (req, res) => {
    //socket
    friendSocket(res);
    //end socket
    const myId = res.locals.users.id;
    const myUser = await Users.findOne({ _id: myId });
    let listFriend = [];
    myUser.friendList.map(item => {
        listFriend.push(item.user_id);
    })
    const userList = await Users.find({
        $and: [
            { _id: { $ne: (myId) } },
            { _id: { $in: listFriend } },
            { status: "active" }
        ]
    }
    ).select("fullName avatar id");
    res.render("client/pages/friend/listFriend", {
        pageTitle: "Danh sách bạn bè",
        listFriend: userList
    })
}