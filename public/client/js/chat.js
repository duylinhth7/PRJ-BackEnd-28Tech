const formSend = document.querySelector(".chat .inner-form")
if (formSend) {
    formSend.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        socket.emit("CLIENT_SEND_MESSAGE", content);
        e.target.elements.content.value = ''
    });
}

socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body")
    const div = document.createElement("div");
    const innerFullName = ""
    if(myId === data.user_id){
        div.classList.add("inner-send")
    } else {
        innerFullName = `<div class="inner-name">${data.fullName}</div>`
        div.classList.add("inner-comming")
    }
    
    div.innerHTML = `
    ${innerFullName}
    <div class="inner-content">${data.content}</div>
    `
    body.appendChild(div)
    body.scrollTop = body.scrollHeight
});


const bodyChat = document.querySelector(".chat .inner-body");
if(bodyChat){
    bodyChat.scrollTop = bodyChat.scrollHeight;
}