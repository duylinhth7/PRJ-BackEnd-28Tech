// function typing
var timeOut;
const typing = () => {
    socket.emit("CLIENT_SEND_TYPING", "show");
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden")
    }, 3000)
}
// end function typing
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
        typing();
        input.focus();
        const end = input.value.length;
        input.setSelectionRange(end, end);
    });
//end emoji-picke

// typing
input.addEventListener("keyup", () => {
    typing();
})

const innerTyping = document.querySelector(".inner-typing");
if (innerTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        if (data.typing == "show") {
            const checkTyping = innerTyping.querySelector(`[data-id="${data.user_id}"]`)
            if (!checkTyping) {
                const boxTyping = document.createElement("div")
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("data-id", data.user_id)
                boxTyping.innerHTML = `
                            <div class="inner-name"> ${data.fullName} </div>
                            <div class="typing-container">
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>
                            </div>
                        `
                innerTyping.appendChild(boxTyping)
                const bodyChat = document.querySelector(".chat .inner-body");
                if (bodyChat) {
                    bodyChat.scrollTop = bodyChat.scrollHeight;
                }
            }
        } else {
            const boxTypingRemove = innerTyping.querySelector(`[data-id="${data.user_id}"]`);
            if (boxTypingRemove) {
                innerTyping.removeChild(boxTypingRemove)
            }
        }
    })
}
// end typing


