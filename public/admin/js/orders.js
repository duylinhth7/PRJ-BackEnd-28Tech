const buttonStatus = document.querySelectorAll("[button-change-status]")
if(buttonStatus){
    buttonStatus.forEach(item => {
        const formChangeStatus = document.querySelector("[form-change-status]");
        const path = formChangeStatus.getAttribute("path")
        item.addEventListener("click", () => {
            const id = item.getAttribute("data-id");
            const statusCurrent = item.getAttribute("data-status");
            const statusChange = statusCurrent == "pending" ? "confirmed" : "pending"
            const action = `${path}/${id}/${statusChange}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}