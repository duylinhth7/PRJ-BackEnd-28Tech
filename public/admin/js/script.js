//Filter Status
const statusButton = document.querySelectorAll("[button-status]");
if (statusButton.length > 0) {
    const url = new URL(window.location.href);
    // console.log(url);
    statusButton.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    });

    //end 

    //Search
    const formSearch = document.querySelector("#form-search");
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        const url = new URL(window.location.href);
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}

//end Search

//Panigation

const buttonPanigation = document.querySelectorAll("[button-panigation]");
buttonPanigation.forEach(button => {
    if (button) {
        const url = new URL(window.location.href);
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-panigation");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    }
})

//end

//CHECK BOX CHANGE STATUS MUTIL
const checkBoxMutil = document.querySelector("[checkbox-mutil]")
if (checkBoxMutil) {
    const inputCheckAll = checkBoxMutil.querySelector("input[name='checkall']");
    const inputIds = checkBoxMutil.querySelectorAll("input[name='id']")
    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputIds.forEach(item => {
                item.checked = true;
            })
        } else {
            inputIds.forEach(item => {
                item.checked = false;
            })
        }
    })
    inputIds.forEach(item => {
        item.addEventListener("click", () => {
            const countChecked = checkBoxMutil.querySelectorAll("input[name='id']:checked").length;
            if (countChecked == inputIds.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
}

//end

// FORM CHANGE MUTIL STATUS
const formChangeMutil = document.querySelector("[form-change-mutil]")
if (formChangeMutil) {
    formChangeMutil.addEventListener("submit", (e) => {
        e.preventDefault();
        const valueSubmit = e.target.elements[0].value;
        if(valueSubmit == 'delete'){
            const Confirm = confirm("Bạn có muốn xóa các sản phẩm đó không?");
            if(Confirm == false ){
                return;
            }
        }
        const checkBoxMutil = document.querySelector("[checkbox-mutil]")
        const inputsChecked = checkBoxMutil.querySelectorAll("input[name='id']:checked");
        if (inputsChecked.length > 0) {
            const ids = [];
            const inputIds = formChangeMutil.querySelector("input[name='ids']");
            inputsChecked.forEach(item => {
                const id = item.value;
                if(valueSubmit == "change-position"){
                    const position = item.closest('tr').querySelector("input[name='input-position']").value;
                    ids.push(`${id}-${position}`)
                } else {
                    ids.push(id)
                }
            })
            // console.log(ids.join(", "));
            inputIds.value = ids.join(", ")
            formChangeMutil.submit();
        } else {
            alert("Vui lòng chọn ít nhất 1 sản phẩm!");
        }
    })
}

//end

// Preview Image
const inputImage = document.querySelector("[inputImage]");
const previewImage = document.querySelector("[previewImage]");

if(inputImage){
    inputImage.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = () => {
            previewImage.src = fileReader.result;
        }
        fileReader.readAsDataURL(file);
    })
}

const closePreview = document.querySelector(".close-preview")
if(closePreview){
    closePreview.addEventListener("click", () => {
        inputImage.value = "";
        previewImage.src = "";
    })
}
//end Preview Image

//Sort product

const sort = document.querySelector("#sort");
if(sort){
    const sortSlect = sort.querySelector("[sort-select]");
    sortSlect.addEventListener("change", (e) => {
        const value = (e.target.value).split("-");
        const [sortKey, sortValue] = value;
        const url = new URL(window.location.href);
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);
        window.location.href = url.href;
    })

    const deleteSort = sort.querySelector("[delete-sort]");
    deleteSort.addEventListener("click", () => {
        const url = new URL(window.location.href);
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    })

    //Thêm selected
    const url = new URL(window.location.href);
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue){
        sortString = `${sortKey}-${sortValue}`
        const sortSelected = sort.querySelector(`option[value='${sortString}']`);
        sortSelected.setAttribute("selected", true);
    }
}

//End sort product