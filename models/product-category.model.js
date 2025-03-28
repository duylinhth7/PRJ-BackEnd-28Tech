const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({

    title: String,
    parent_id: {
        type: String,
        default: " "
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
    description: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    }

}, { timestamps: true });
const ProductCategory = mongoose.model("ProductCategory", productSchema, "products-category");

module.exports = ProductCategory;