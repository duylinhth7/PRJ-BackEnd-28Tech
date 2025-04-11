// Chức năng kết bạn
const buttonRequest = document.querySelectorAll("[button-request]");
if (buttonRequest) {
    buttonRequest.forEach(button => {
        button.addEventListener("click", () => {
            const userId = button.getAttribute("button-request")
            socket.emit("CLIENT_ADD_FRIEND", userId)
            button.closest(".block-user").classList.add("add");
        })
    })
}
// Hết chức năng kết bạn

//Chức năng hủy yêu cầu
const buttonCancelRequest = document.querySelectorAll("[button-cancel-request]");
if (buttonCancelRequest) {
    buttonCancelRequest.forEach(button => {
        button.addEventListener("click", () => {
            const userId = button.getAttribute("button-cancel-request");
            socket.emit("CLIENT_CANCEL_ADD_FRIEND", userId)
            button.closest(".block-user").classList.remove("add");
        })
    })
}
//Hết Chức năng hủy yêu cầu

//Chức năng đồng ý kết bạn
const buttonAccept = document.querySelectorAll("[button-accept]");
if (buttonAccept) {
    buttonAccept.forEach(button => {
        button.addEventListener("click", () => {
            const userId = button.getAttribute("button-accept");
            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
            button.closest(".block-user").classList.add("has-friend")
        })
    })
}
// Hết chức năng đồng ý kết 

//Chức năng từ chối kết bạn
const buttonCancelAccpet = document.querySelectorAll("[button-cancel-accept]");
if (buttonCancelAccpet) {
    buttonCancelAccpet.forEach(button => {
        button.addEventListener("click", () => {
            const userId = button.getAttribute("button-cancel-accept");
            socket.emit("CLIENT_CANCEL_ACCEPT", userId)
            button.closest(".block-user").classList.add("has-cancel")
        })
    })
}
// Hết chức năng từ chối kết bạn

//Hiển thị real time kết bạn
const boxAccept = document.querySelector(".box-accept");
if (boxAccept) {
    const acceptMyId = boxAccept.getAttribute("accept-my-id");
    socket.on("SERVER_RETURN_ADD_FRIEND", (data) => {
        if (data.userId === acceptMyId) {
            let div = document.createElement("div");
            div.innerHTML =
                `
                <div class="col-6">
                    <div class="block-user">
                        <div class="inner-image">
                            <img  src="${data.infoUser.avatar ? data.infoUser.avatar : "/uploads/images.png"}"/>
                        </div>
                        <div class="inner-info">
                            <div class="inner-name">
                                ${data.infoUser.fullName}
                            </div>
                        </div>
                        <div class="inner-button">
                            <button 
                                class="btn btn-success mx-2" 
                                button-accept=${data.infoUser._id}
                            >
                                Đồng ý
                            </button>
                            <button 
                                class="btn btn-secondary" 
                                button-cancel-accept=${data.infoUser._id}
                            >
                                Từ chối
                            </button>
                            <span 
                                button-has-friend 
                                class="btn btn-primary"
                            >
                                Đã là bạn bè
                            </span>
                            <span 
                                class="btn btn-danger" 
                                button-has-cancel
                            >
                                Đã từ chối
                            </span>
                        </div>

                    </div>
                </div>
                `
            boxAccept.appendChild(div);
            const buttonCancelAccpet = document.querySelectorAll("[button-cancel-accept]");
            if (buttonCancelAccpet) {
                buttonCancelAccpet.forEach(button => {
                    button.addEventListener("click", () => {
                        const userId = button.getAttribute("button-cancel-accept");
                        socket.emit("CLIENT_CANCEL_ACCEPT", userId)
                        button.closest(".block-user").classList.add("has-cancel")
                    })
                })
            }
            const buttonAccept = document.querySelectorAll("[button-accept]");
            if (buttonAccept) {
                buttonAccept.forEach(button => {
                    button.addEventListener("click", () => {
                        const userId = button.getAttribute("button-accept");
                        socket.emit("CLIENT_ACCEPT_FRIEND", userId);
                        button.closest(".block-user").classList.add("has-friend")
                    })
                })
            }
        }
    })
}
//Hết Hiển thị real time kết bạn

//Xóa realTime khi bị reject;
boxRequest = document.querySelector(".box-request");
if(boxRequest){
    const myId = boxRequest.getAttribute("my-id-request");
    socket.on("SERVER_RETURN_CANCEL_ACCEPT", (data) => {
        if(myId === data.userRequest){
            const idUserCancel = data.userCancel;
            const boxUserCancel = boxRequest.querySelector(`[id-user-request="${idUserCancel}"]`);
            if(boxUserCancel){
                boxUserCancel.remove();
            }
        }
    })
}
//Hết Xóa realTime khi bị reject;


//Hiển thị real time số lượng accept friend
const innerAccept = document.querySelector(".accept-friends");
if(innerAccept){
    socket.on("SERVER_RETURN_ADD_FRIEND", (data) => {
        const userAccept = innerAccept.querySelector("[user-id-accept]");
        const idUserAccept = userAccept.getAttribute("user-id-accept");
        if(idUserAccept === data.userId){
            let spanChild = document.createElement("b");
            spanChild.className = ("badge bg-danger");
            spanChild.setAttribute("user-id-accept", idUserAccept);
            spanChild.textContent = data.acceptLength
            innerAccept.replaceChild(spanChild, userAccept);
        }
    });

    socket.on("SERVER_RETURN_CANCEL_ADD_FRIEND", (data) => {
        const userAccept = innerAccept.querySelector("[user-id-accept]");
        const idUserAccept = userAccept.getAttribute("user-id-accept");
        if(idUserAccept === data.userId){
            let spanChild = document.createElement("b");
            spanChild.className = ("badge bg-danger");
            spanChild.setAttribute("user-id-accept", idUserAccept);
            spanChild.textContent = data.acceptLength
            innerAccept.replaceChild(spanChild, userAccept);
        }
    })
}
//Hết Hiển thị real time số lượng accept friend