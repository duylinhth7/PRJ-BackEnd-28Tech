const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({

    title: String,
    product_category_id: String,
    description: String,
    price: Number,
    featured: String,
    discountPercentage: Number,
    createdBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean,
    deletedAt: Date,
    description: String,
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date
        }
    ],
    slug: {
        type: String,
        slug: "title",
        unique: true
    }

}, { timestamps: true });
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;