const productCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const createTreeHelper = require("../../helpers/createTree");


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
    if (req.query.sortKey && req.query.sortValue) {
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

//[GET] admin/product-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await productCategory.find(find);
    const newRecords = createTreeHelper(records);

    res.render("admin/pages/product-category/create", {
        title: "Trang tạo mới danh mục sản phẩm",
        record: newRecords
    })
}
// END

//[POST] admin/product-category/creat
module.exports.createPost = async (req, res) => {
    if (res.locals.role.permissions.includes("product-category_create")) {

    if (req.body.position != "") {
        req.body.position = parseInt(req.body.position);
    } else {
        const position = await productCategory.countDocuments({});
        req.body.position = position + 1;
    }

    const record = new productCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
} else {
    return res.send("403 !")
}
}
// END


// [PATCH] admin/products/change-status/:status/id
module.exports.changeStatusCategory = async (req, res) => {
    if (res.locals.role.permissions.includes("product-category_edit")) {
    // console.log(req.params)
    const id = req.params.id
    const status = req.params.status
    await productCategory.updateOne({ _id: id }, { status: status })
    res.redirect("back")
    } else {
        return res.send("403 !")
    }
}

//end

//[DELETE]

module.exports.deleteItem = async (req, res) => {
    if (res.locals.role.permissions.includes("product-category_delete")) {
    const id = req.params.id;
    await productCategory.updateOne({ _id: id }, {
        deleted: true
    })
    res.redirect("back");
} else  {
    return res.send("403 !")
}
}

//end

// [PATCH] admin/products/change-mutil
module.exports.changeMutil = async (req, res) => {
    if (res.locals.role.permissions.includes("product-category_edit")) {
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
} else {
    return res.send("403 !")
}
}

// END

//[GET] admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const data = await productCategory.findOne({
        _id: id,
        deleted: false
    });

    const record = await productCategory.find({
        deleted: false
    })


    const newRecord = createTreeHelper(record);

    res.render("admin/pages/product-category/edit.pug",
        {
            data: data,
            record: newRecord
        }
    )

}

//end

//[PATCH] admin/product-category/edit/:id
module.exports.editPatch = async (req, res) => {
    if (res.locals.role.permissions.includes("product-category_edit")) {
    try {
        req.body.position = parseInt(req.body.position)
        const id = req.params.id;   
        await productCategory.updateOne({ _id: id }, req.body)
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    } catch (error) {
        res.redirect("back")

    }
} else {
    return res.send("403 !")
}
}

//END
