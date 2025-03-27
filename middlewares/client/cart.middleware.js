const Cart = require("../../models/cart.model")

module.exports.cart = async (req, res, next) => {
    if (!req.cookies.cartId) {
        const cart = new Cart();
        await cart.save();
        res.cookie('cartId', cart.id,
            {
                expires: new Date(Date.now() + 31536000000) //Lưu lại cookies này trong vòng 1 năm 1000*60*60*24*365 
            })
    } else {
        
    }
    next();
}