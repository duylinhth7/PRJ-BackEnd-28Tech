const Product = require("../../models/product.model")
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: 'desc' });
    res.render("client/pages/products/index", {
        pageTitle: "Trang sản phẩm",
        listProduct: products
    })
};

module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
    const find = {
        deleted: false,
        status: "active",
        slug: slug
    }
    const product = await Product.findOne(find);
    if(slug != "undefined"){
        res.render("client/pages/products/detail", {
            product: product
        })
    } else {
        res.send("Not found product!")
    }
}