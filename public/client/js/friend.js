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
if(buttonCancelRequest){
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
if(buttonAccept){
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
if(buttonCancelAccpet){
    buttonCancelAccpet.forEach(button => {
        button.addEventListener("click", () => {
            const userId = button.getAttribute("button-cancel-accept");
            socket.emit("CLIENT_CANCEL_ACCEPT", userId)
            button.closest(".block-user").classList.add("has-cancel")
        })
    })
}
// Hết chức năng từ chối kết bạn