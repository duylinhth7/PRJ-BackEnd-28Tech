const ProductCategory = require("../models/product-category.model")
module.exports.getChildCategory = async (parentId) => {
    const getCategory = async (parentId) => {
        const child = await ProductCategory.find({
            parent_id: parentId,
            deleted: false,
            status: "active"
        });
        let allChild = [...child]
        for (const item of child) {
            const childs = await getCategory(item.id);
            allChild = allChild.concat(childs)
        }
        return allChild
    }
    const listCategory = await getCategory(parentId);
    const result = listCategory.map(item => item.id)
    return result;
}