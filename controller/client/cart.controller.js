const Cart = require("../../models/cart.model")
// [GET] /cart
module.exports.index = async (req, res) => {
    // res.send("ok")
}
// [POST] /cart/:id
module.exports.cartPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const product_id = req.params.id
    const quantity = parseInt(req.body.quantity)
    const cart = await Cart.findOne({
        _id: cartId
    })
    const checkCart = cart.products.find(item => item.product_id === product_id);
    if (checkCart) {
        const newQuantity = checkCart.quantity+quantity;
        await Cart.updateOne(
            { _id: cartId, "products.product_id": product_id}, // Find document with matching order._id
            { $set: { "products.$.quantity": newQuantity } } // Update only the matched order
          );
          
    } else {
            await Cart.updateOne(
                { _id: cartId },
                { $push: { products: { product_id, quantity } } }
            )

    }
}