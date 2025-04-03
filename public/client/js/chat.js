// CLIENT SEND MESSAGE
const formSend = document.querySelector(".chat .inner-form")
if (formSend) {
    formSend.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        socket.emit("CLIENT_SEND_MESSAGE", content);
        e.target.elements.content.value = ''
    });
}
// END CLIENT SEND MESSAGE

// SERVER RETURN MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body")
    const div = document.createElement("div");
    let innerFullName = ""
    if (myId === data.user_id) {
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

// END SERVER RETURN MESSAGE


// Scroll chat
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
//End Scroll chat

//emoji-picke
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';
const button = document.querySelector(".chat form span")
const tooltip = document.querySelector(".tooltip")
Popper.createPopper(button, tooltip);
button.addEventListener("click", () => {
    tooltip.classList.toggle("shown")
})

//show on input
const input = document.querySelector("input[name='content']")
document.querySelector('emoji-picker')
    .addEventListener('emoji-click', (e) => {
        const icon = e.detail.unicode;
        input.value = input.value + icon
    });
//end emoji-picke

// typing
input.addEventListener("keyup", () => {
    socket.emit("CLIENT_SEND_TYPING", "show")
})
socket.on("SERVER_RETURN_TYPING", (data) => {
    console.log(data)
})
// end typing


