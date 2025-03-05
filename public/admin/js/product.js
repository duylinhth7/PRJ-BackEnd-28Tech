// CHANGE STATUS
const buttonChange = document.querySelectorAll("[button-change-status]");
if (buttonChange.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonChange.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const statusCurrent = button.getAttribute("data-status");
            const statusChange = statusCurrent == "active" ? "inactive" : "active";
            const action = `${path}/${statusChange}/${id}?_method=PATCH`;
            // console.log(action);
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}

// end

//DETELTE ITEM

const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path-delete");
    buttonDelete.forEach(item => {
        item.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có muốn xóa sản phẩm này hay không?");
            if(isConfirm){
                const id = item.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}

//end