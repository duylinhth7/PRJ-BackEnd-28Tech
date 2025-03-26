const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model")
const productCategoryHelper = require("../../helpers/product-category");

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

module.exports.productCategory = async (req, res) => {
    const slugCategory = req.params.slugCategory;
    const productCategory = await ProductCategory.findOne({
        slug:  slugCategory,
        deleted: false,
        status: "active"
    })

    const listCategoryId = await productCategoryHelper.getChildCategory(productCategory.id);
    const listProduct = await Product.find({
        product_category_id: {$in: [productCategory, ...listCategoryId]}
    })
    res.render("client/pages/products/index", {
        title: "Danh mục",
        listProduct: listProduct
    })
}