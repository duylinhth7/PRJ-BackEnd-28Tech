const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
    if (req.query.keyword) {
        const keyWord = req.query.keyword;
        const myRe = new RegExp(keyWord, "i");
        const products = await Product.find({
            title: myRe,
            deleted: false,
            status: "active"
        });
        res.render("client/pages/search/index", {
            title: myRe,
            products: products
        })
    }

}