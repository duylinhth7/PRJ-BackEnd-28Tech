const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
    const productFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    });
    const productNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({
        position: "desc"
    }).limit(6)
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productFeatured: productFeatured,
        productNew: productNew
    })
};