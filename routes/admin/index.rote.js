const dashboardRoute = require("./dashboard.route")
const systemConfig = require("../../config/system")
const productRoute = require("./product.route")
const productCategory = require("./product-category.route")
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRoute); 
    app.use(PATH_ADMIN + "/product", productRoute); 
    app.use(PATH_ADMIN + "/product-category", productCategory); 
    

};