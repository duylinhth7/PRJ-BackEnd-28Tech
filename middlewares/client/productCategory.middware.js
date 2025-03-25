const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
module.exports.category = async (req, res, next) => {
    const category = await ProductCategory.find(
        { deleted: false }
    );
    const layoutProductCategory =  createTreeHelper(category);
    res.locals.layoutProductCategory = layoutProductCategory;
    next();
}