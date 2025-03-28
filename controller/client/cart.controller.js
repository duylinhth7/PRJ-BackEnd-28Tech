const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
// [GET] /cart
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    });
    for (const item of cart.products) {
        const product = await Product.findOne({
            _id: item.product_id,
            deleted: false,
            status: "active"
        }).select("thumbnail title price discountPercentage slug");
        item.product_category_id = product.product_category_id
        item.productInfo = {
            thumbnail: product.thumbnail,
            title: product.title,
            price: parseInt(product.price),
            discountPercentage: product.discountPercentage,
            slug: product.slug
        }
    }   
    const totalPrice = cart.products.reduce((sum, item) => {
        return (sum + item.quantity * item.productInfo.price)
    }, 0)
    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",
        cart: cart,
        totalPrice: totalPrice
    })
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
        const newQuantity = checkCart.quantity + quantity;
        await Cart.updateOne(
            { _id: cartId, "products.product_id": product_id }, // Find document with matching order._id
            { $set: { "products.$.quantity": newQuantity } } // Update only the matched order
        );

    } else {
        await Cart.updateOne(
            { _id: cartId },
            { $push: { products: { product_id, quantity } } }
        )

    }
}

//[DELETE] /cart/delete/:id
module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;
    const product_id = req.params.id;
    await Cart.updateOne(
        { '_id': cartId }, 
        { $pull: { products: { product_id: product_id    } } }
    );
    res.redirect("back");
}

//[GET] /cart/update/:quantity/id
module.exports.update = async (req, res) => {
    const product_id = req.params.id;
    const quantity = req.params.quantity;
    const cartId = req.cookies.cartId;
    await Cart.updateOne(
        { _id: cartId, "products.product_id": product_id }, // Find document with matching order._id
        { $set: { "products.$.quantity": quantity } } // Update only the matched order
    );
    res.redirect("back")
}