const dashboardRoute = require("./dashboard.route")
const systemConfig = require("../../config/system")
const productRoute = require("./product.route")
const productCategory = require("./product-category.route")
const roleAdmin =  require("./role.route")
const authRoute = require("./auth.route")
const accountsRoute = require("./accounts.route")
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRoute); 
    app.use(PATH_ADMIN + "/product", productRoute); 
    app.use(PATH_ADMIN + "/product-category", productCategory); 
    app.use(PATH_ADMIN + "/role", roleAdmin);
    app.use(PATH_ADMIN + "/accounts", accountsRoute)
    app.use(PATH_ADMIN + "/auth", authRoute)
};