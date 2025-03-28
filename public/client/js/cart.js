const input = document.querySelectorAll("input[name='quantity']")
if(input.length > 0){
    input.forEach(item => {
        item.addEventListener("change", () => {
            const quantity = item.value;
            productId = item.getAttribute("product-id");
            window.location.href = `/cart/update/${quantity}/${productId}`
        })
    })
}