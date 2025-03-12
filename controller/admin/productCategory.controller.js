const productCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    // Bộ lọc status
    const filterStatus = filterStatusHelper(req.query);
    if (req.query.status) {
        find.status = req.query.status;
    }
    //end


    // Search
    const objectSearch = searchHelper(req.query);
    if (objectSearch.RegExp) {
        find.title = objectSearch.RegExp;
    }
    //end

    //đệ quy 
    function createTree(arr, parentId = " ") {
        let tree = [];
        arr.forEach((item) => {
            if (item.parent_id === parentId) {
                const newItem = item;
                const children = createTree(arr, item.id);
                if (children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    };

    const sort = {
        
    };
    if(req.query.sortKey && req.query.sortValue){
        sortKey = req.query.sortKey;
        sortValue = req.query.sortValue;
        sort[sortKey] = sortValue;
    } else {
        sort["position"] = "desc";
    }

    const records = await productCategory.find(find).sort(sort);
    const newRecords = createTree(records);

    res.render("admin/pages/product-category/index", {
        title: "Trang danh mục sản phẩm",
        record: newRecords,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword

    })
}

//[GET] admin/product-category/creat
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };
    //đệ quy 
    function createTree(arr, parentId = " ") {
        let tree = [];
        arr.forEach((item) => {
            if (item.parent_id === parentId) {
                const newItem = item;
                const children = createTree(arr, item.id);
                if (children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }

    const records = await productCategory.find(find);
    const newRecords = createTree(records);

    res.render("admin/pages/product-category/create", {
        title: "Trang tạo mới danh mục sản phẩm",
        record: newRecords
    })
}
// END

//[POST] admin/product-category/creat
module.exports.createPost = async (req, res) => {

    if (req.body.position != "") {
        req.body.position = parseInt(req.body.position);
    } else {
        const position = await productCategory.countDocuments({});
        req.body.position = position + 1;
    }

    const record = new productCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}
// END


// [PATCH] admin/products/change-status/:status/id
module.exports.changeStatusCategory = async (req, res) => {
    // console.log(req.params)
    const id = req.params.id
    const status = req.params.status
    await productCategory.updateOne({ _id: id }, { status: status })
    res.redirect("back")
}

//end

//[DELETE]

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await productCategory.updateOne({ _id: id }, {
        deleted: true
    })
    res.redirect("back");
}

//end

// [PATCH] admin/products/change-mutil
module.exports.changeMutil = async (req, res) => {
    const id = req.body.ids.split(", ");
    const type = req.body.type;
    switch (type) {
        case 'active':
            await productCategory.updateMany(
                { _id: { $in: id } },
                { status: "active" }
            );
            break;  
        case "inactive":
            await productCategory.updateMany(
                { _id: { $in: id } },
                { status: "inactive" }
            );
            break;
        case "delete":
            await productCategory.updateMany(
                { _id: { $in: id } },
                {
                    deleted: true,
                    deletedAt: new Date()
                }
            );
            break;
        case "change-position":
            for (const item of id) {
                const [id, postion] = (item.split("-"));
                await productCategory.updateOne({ _id: id }, { position: postion });
            };
            break;
        default:
            break;
    }
    res.redirect("back");
}

