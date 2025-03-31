const Orders = require("../../models/orders.model"); 
const Cart = require("../../models/cart.model");   
const Users = require("../../models/users.model");
const Product = require("../../models/product.model");
//[GET] /orders
module.exports.index = async (req, res) => {
    const orders = await Orders.find({
        deleted: false
    }).sort({createdAt: "desc"});
    res.render("admin/pages/orders/index", {
        title: "Trang quản lý đơn hàng", 
        orders: orders
    })
}

//[PATCH] /orders/changeStatus/:id/:status
module.exports.changeStatus = async (req, res) => {
    try {
        await Orders.updateOne({
            _id: req.params.id
        }, {status: req.params.status})
        res.redirect("back")
    } catch (error) {
        res.redirect("back")
    }
}

//[GET] /order/detail/:id
module.exports.detail = async (req, res) => {
    const orders = await Orders.findOne({_id: req.params.id});
    const cart = await Cart.findOne({_id: orders.cartId});
    const user = await Users.findOne({_id: cart.user_id}).select("fullName email phone");
    const productInfo = [];
    for(const item of orders.products){
        const products = await Product.findOne({_id: item.product_id});
        const product = {
            product_id: item.product_id,
            price: item.price,
            discountPercentage: item.discountPercentage,
            quantity:  item.quantity,
            title: products.title,
            status: products.status,
            thumbnail: products.thumbnail
        }
        productInfo.push(product)
    }
    res.render("admin/pages/orders/detail", {
        title: "Trang chi tiết đơn hàng",
        orders: orders,
        infoUser: user,
        productInfo: productInfo
    })
}