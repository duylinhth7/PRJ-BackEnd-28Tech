// Change status
const buttonChange = document.querySelectorAll("[button-change-status]")
if(buttonChange.length > 0){
    const formChangeStatus  = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonChange.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            const statusChange = statusCurrent == "active" ? "inactive" : "active";
            // router.patch("/change-status/:status/:id", controller.changeStatusCategory);

            const action = `${path}/${statusChange}/${id}?_method=PATCH`
            formChangeStatus.action = action;
            formChangeStatus.submit();
            
        })
    })
}

//end change status

//delete category
const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete){
    const formDelete = document.querySelector("#form-delete-item")
    const path = formDelete.getAttribute("data-path-delete")
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id")
            // router.delete("/delete/:id", controller.deleteItem);
            const action = `${path}/${id}?_method=DELETE`
            formDelete.action = action
            formDelete.submit()
        })
    })
}
