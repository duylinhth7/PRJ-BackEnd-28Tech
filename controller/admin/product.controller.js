const Product = require("../../models/product.model");
const productCategory = require("../../models/product-category.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const panigationHelper = require("../../helpers/panigation");
const systemConfig = require("../../config/system");
const Accounts = require("../../models/accounts.model");
const createTreeHelper = require("../../helpers/createTree");


// [GET] admin/product
module.exports.product = async (req, res) => {

    const find = {
        deleted: false
    }

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

    //Panigation
    const countProducts = await Product.countDocuments(find);
    const objectPanigation = panigationHelper(
        {
            currentPage: 1,
            limitItems: 4,
        },
        req.query,
        countProducts
    );

    const sort = {

    };

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort['position'] = 'desc';
    }
    const products = await Product.find(find).limit(objectPanigation.limitItems).skip(objectPanigation.skipItems).sort(sort);
    for (const item of products) {
        const user = await Accounts.findOne({ _id: item.createdBy.account_id })
        if (user) {
            item.accountFullName = user.fullName;
        }
        const update = item.updatedBy[item.updatedBy.length - 1];
        if (update) {
            const updated_id = update.account_id;
            const user = await Accounts.findOne({ _id: updated_id });
            update.accountFullName = user.fullName
        }
    };
    res.render("admin/pages/product/index", {
        title: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        panigation: objectPanigation
    });
}

// [PATCH] admin/products/change-status/:status/id
module.exports.changeStatus = async (req, res) => {
    // console.log(req.params)
    if (res.locals.role.permissions.includes("product_edit")) {
        const id = req.params.id
        const status = req.params.status
        const updated = {
            account_id: res.locals.user.id,
            updatedAt: new Date
        };
        await Product.updateOne({ _id: id }, {
            status: status,
            $push: { updatedBy: updated }
        })
        res.redirect("back")
    } else {
        return res.send("403 !")
    }
}

// [PATCH] admin/products/change-mutil
module.exports.changeMutil = async (req, res) => {
    if (res.locals.role.permissions.includes("product_edit")) {

        const id = req.body.ids.split(", ");
        const type = req.body.type;
        const updated = {
            account_id: res.locals.user.id,
            updatedAt: new Date
        };
        switch (type) {
            case 'active':
                await Product.updateMany(
                    { _id: { $in: id } },
                    { status: "active", $push: { updatedBy: updated } }
                );
                break;
            case "inactive":
                await Product.updateMany(
                    { _id: { $in: id } },
                    { status: "inactive", $push: { updatedBy: updated } }
                );
                break;
            case "delete":
                await Product.updateMany(
                    { _id: { $in: id } },
                    {
                        deleted: true,
                        deletedAt: new Date(),
                        $push: { updatedBy: updated }
                    }
                );
                break;
            case "change-position":
                for (const item of id) {
                    const [id, postion] = (item.split("-"));
                    await Product.updateOne({ _id: id }, { position: postion, $push: { updatedBy: updated } });
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

module.exports.deleteItem = async (req, res) => {
    if (res.locals.role.permissions.includes("product_delete")) {
        const id = req.params.id;
        // Xóa cứng
        // await Product.deleteOne({_id: id});

        //Xóa mềm
        await Product.updateOne({ _id: id },
            {
                deleted: true,
                deletedAt: new Date(),
                $push: { updatedBy: updated }
            },
        );
        res.redirect("back");
    } else {
        return res.send("403 !")
    }
};

//Thêm mới sản phẩm
//[GET] admin.product/create
module.exports.create = async (req, res) => {
    const record = await productCategory.find({ deleted: false });
    const newRecord = createTreeHelper(record);
    res.render("admin/pages/product/create", {
        record: newRecord
    });
};

//[POST] admin/products/create
module.exports.createPost = async (req, res) => {
    if (res.locals.role.permissions.includes("product_create")) {
        try {
            req.body.price = parseInt(req.body.price);
            req.body.discountPercentage = parseInt(req.body.discountPercentage);
            if (req.body.position != "") {
                req.body.position = parseInt(req.body.position);
            } else {
                const position = await Product.countDocuments({});
                req.body.position = position + 1;
            }
            req.body.stock = parseInt(req.body.stock);
            req.body.deleted = false;
            req.body.createdBy = {
                account_id: res.locals.user.id
            }
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.redirect(`${systemConfig.prefixAdmin}/product`);

        } catch (error) {
            res.redirect("back");
        }
    } else {
        return res.send("403 !")
    }

};

//[GET] admin/product/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };
        const record = await productCategory.find({ deleted: false })
        const newRecord = createTreeHelper(record);
        const product = await Product.findOne(find);
        res.render("admin/pages/product/edit",
            {
                product: product,
                record: newRecord
            }
        )
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/product`)
    }
}

// [PATCH] admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
    if (res.locals.role.permissions.includes("product_edit")) {
        try {
            req.body.price = parseInt(req.body.price);
            req.body.discountPercentage = parseInt(req.body.discountPercentage);
            const position = await Product.countDocuments({});
            req.body.position = position + 1;
            req.body.stock = parseInt(req.body.stock);
            req.body.deleted = false;
            const product = req.body;
            const id = req.params.id;
            const updated = {
                account_id: res.locals.user.id,
                updatedAt: new Date
            };
            await Product.updateOne({ _id: id }, {
                ...product,
                $push: { updatedBy: updated }
            });
            res.redirect(`${systemConfig.prefixAdmin}/product`);
        } catch (error) {
            res.redirect("back");
        }
    } else {
        return res.send("403 !")
    }
}

//[GET] admin/product/detail/id

module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const find = {
        deleted: false,
        _id: id
    };
    const product = await Product.findOne(find)
    res.render('admin/pages/product/detail',
        {
            product: product
        }
    )
}
