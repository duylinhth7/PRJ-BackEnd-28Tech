const productCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");

module.exports.index = (req, res) => {
    res.render("admin/pages/product-category/index", {
        title: "Trang danh mục sản phẩm"
    })
}

//[GET] admin/product-category/creat
module.exports.create = (req, res) => {
    res.render("admin/pages/product-category/create", {
        title: "Trang tạo mới danh mục sản phẩm"
    })
}
// END

//[POST] admin/product-category/creat
module.exports.createPost = async (req, res) => {

    if(req.body.position != ""){
        req.body.position = parseInt(req.body.position);
    } else{
        const position = await productCategory.countDocuments({});
        req.body.position = position + 1;
    }

    const record = new productCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}
// END