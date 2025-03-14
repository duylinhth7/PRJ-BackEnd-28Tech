const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete.length > 0){
    const formDelete = document.querySelector("#form-delete-item");
    // const id = buttonDelete.getAttribute("data-id");
    const path = formDelete.getAttribute("data-path-delete")
    buttonDelete.forEach(item => {
        item.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa không?")
            if(isConfirm){
            const id = item.getAttribute("data-id")
            const action = `${path}/${id}?_method=DELETE`
            formDelete.action = action
            formDelete.submit();
            }
        })
    })
}