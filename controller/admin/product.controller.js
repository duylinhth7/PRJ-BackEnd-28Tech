const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const panigationHelper = require("../../helpers/panigation");
const systemConfig = require("../../config/system");



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
    )

    // const objectPanigation = {
    //     currentPage: 1,
    //     limitItems: 4,
    // }
    // if(req.query.page){
    //     objectPanigation.currentPage = parseInt(req.query.page);
    // };
    // objectPanigation.skipItems = (parseInt(req.query.page) -1) * (objectPanigation.limitItems);

    // objectPanigation.totalPages = Math.ceil(countProducts/objectPanigation.limitItems);
    // console.log(objectPanigation.toltalPages)

    //end
    const products = await Product.find(find).limit(objectPanigation.limitItems).skip(objectPanigation.skipItems).sort({ position: 'desc' });
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
    const id = req.params.id
    const status = req.params.status
    await Product.updateOne({ _id: id }, { status: status })
    res.redirect("back")
}

// [PATCH] admin/products/change-mutil
module.exports.changeMutil = async (req, res) => {
    const id = req.body.ids.split(", ");
    const type = req.body.type;
    switch (type) {
        case 'active':
            await Product.updateMany(
                { _id: { $in: id } },
                { status: "active" }
            );
            break;
        case "inactive":
            await Product.updateMany(
                { _id: { $in: id } },
                { status: "inactive" }
            );
            break;
        case "delete":
            await Product.updateMany(
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
                await Product.updateOne({ _id: id }, { position: postion });
            };
            break;
        default:
            break;
    }
    res.redirect("back");
}

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    // Xóa cứng
    // await Product.deleteOne({_id: id});

    //Xóa mềm
    await Product.updateOne({ _id: id },
        {
            deleted: true,
            deletedAt: new Date()
        },
    );
    res.redirect("back");
};

//Thêm mới sản phẩm
//[GET] admin.product/crate
module.exports.create = (req, res) => {
    console.log(req.params)
    res.render("admin/pages/product/create");
};

//[POST] admin/products/create

module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    const position = await Product.countDocuments({});
    req.body.position = position + 1;
    req.body.stock = parseInt(req.body.stock);
    req.body.deleted = false;
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`${systemConfig.prefixAdmin}/product`);

};

//[GET] admin/product/edit/id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };
        const product = await Product.findOne(find);
        res.render("admin/pages/product/edit",
            {
                product: product
            }
        )
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/product`)
    }
}

// [PATCH] admin/product/edit/id
module.exports.editPatch = async (req, res) => {
    try {
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        const position = await Product.countDocuments({});
        req.body.position = position + 1;
        req.body.stock = parseInt(req.body.stock);
        req.body.deleted = false;
        if (req.file) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }
        const product = req.body;
        const id = req.params.id;
        await Product.updateOne({ _id: id }, product);
        res.redirect(`${systemConfig.prefixAdmin}/product`);
    } catch (error) {
        res.redirect("back");
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
