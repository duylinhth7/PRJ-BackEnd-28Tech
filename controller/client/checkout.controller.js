const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const Orders = require("../../models/orders.model")

//[GET] /checkout
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
    res.render("client/pages/checkout/index", {
        pageTitle: "Thanh toán",
        cart: cart,
        totalPrice: totalPrice
    })
}

//[POST] /checkout/order
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    });
    const productOrder = [];
    for (const item of cart.products) {
        const product = await Product.findOne({
            _id: item.product_id,
            deleted: false,
            status: "active"
        })
        const productInfo = {
            product_id: item.product_id,
            quantity: item.quantity,
            price: product.price,
            discountPercentage: product.discountPercentage
        }
        productOrder.push(productInfo)
    }

    const totalPrice = productOrder.reduce((sum, item) => {
        return (sum + item.quantity * item.price)
    }, 0)
    const orderNew = {
        cartId: cartId,
        userInfo: req.body,
        products: productOrder,
        totalPrice: totalPrice
    }
    const order = new Orders(orderNew);
    await order.save();
    await Cart.updateOne({
        _id: cartId
    }, {
        products: []
    });
    res.redirect(`/checkout/success/${order.id}`)
}

//[GET] /checkout/order/success
module.exports.success = async (req, res) => {
    const orderId = req.params.id;
    const order = await Orders.findOne({
        _id: orderId,
        deleted: false
    });
    const productsOrder = [];
    for (const item of order.products) {
        const product = await Product.findOne({
            _id: item.product_id,
            deleted: false
        }).select("title price thumbnail")
        const productInfo = {
            title: product.title,
            price: item.price,
            thumbnail: product.thumbnail,
            quantity: item.quantity
        }
        productsOrder.push(productInfo)
    }
    res.render("client/pages/checkout/success", {
        pageTitle: "Đặt hàng thành công",
        order: order,
        productsOrder: productsOrder
    })
}