//DELETE ROLE
const buttonDelete = document.querySelectorAll("[button-delete]")
if (buttonDelete.length > 0) {
    const formDelete = document.querySelector("#form-delete-item");
    // const id = buttonDelete.getAttribute("data-id");
    const path = formDelete.getAttribute("data-path-delete")
    buttonDelete.forEach(item => {
        item.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa không?")
            if (isConfirm) {
                const id = item.getAttribute("data-id")
                const action = `${path}/${id}?_method=DELETE`
                formDelete.action = action
                formDelete.submit();
            }
        })
    })
}
//END DELETE ROLE


//PERMISSIONS
const tablePermissions = document.querySelector("[table-permissions]")
if (tablePermissions) {
    const buttonSubmit = document.querySelector("[button-patch-permissions]")
    buttonSubmit.addEventListener("click", () => {
        let permissions = [];
        const rows = tablePermissions.querySelectorAll("[data-name]");
        rows.forEach(item => {
            {
                const name = item.getAttribute("data-name");
                const inputs = item.querySelectorAll("input");
                if (name == "id-permissions") {
                    inputs.forEach(input => {
                        const id = input.getAttribute("value");
                        permissions.push({
                            id: id,
                            permissions: []
                        })
                    })
                } else {
                    inputs.forEach((item, index) => {
                        const checked = item.checked;
                        if (checked) {
                            permissions[index].permissions.push(name);
                        }
                    })
                }
            }
        })
        if(permissions.length > 0) {
            const formPatchPermissions = document.querySelector("[form-patch-permissions]");
            if (formPatchPermissions) {
                const inputPatchPermissions = formPatchPermissions.querySelector("[input-patch-permissions]")
                inputPatchPermissions.setAttribute('value', JSON.stringify(permissions));
                formPatchPermissions.submit()
            }
        }

    })
}
//END PERMISSIONS

//PERMISSIONS DATA DEFAULT
const dataRecord = document.querySelector("[data-record]")
if(dataRecord){
    const record = JSON.parse(dataRecord.getAttribute("data-record"));
    const tablePermissions = document.querySelector("[table-permissions]")
    record.forEach((item, index) => {
        item.permissions.forEach(item => {
            const row = tablePermissions.querySelector(`[data-name=${item}]`);
            const input = row.querySelectorAll("input")[index];
            input.checked = true
        })
    })
}
//END PERMISSIONS DATA DEFAULT