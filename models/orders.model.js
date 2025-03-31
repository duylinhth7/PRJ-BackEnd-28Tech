const mongoose = require('mongoose');


const ordersSchema = new mongoose.Schema({
    // user_id: String,
    cartId: String,
    userInfo: {
        fullName: String,
        address: String,
        phone: String
    },
    products: [
        {
            product_id: String,
            price: Number,
            discountPercentage: Number,
            quantity: Number
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    },
    totalPrice: Number,
    status : {
        type: String,
        default: "pending"
    },
    deletedAt: Date,

}, { timestamps: true });
const Orders = mongoose.model("Orders", ordersSchema, "orders");

module.exports = Orders;