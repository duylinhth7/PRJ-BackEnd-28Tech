const dashboardRoute = require("./dashboard.route")
const systemConfig = require("../../config/system")
const productRoute = require("./product.route")
const productCategory = require("./product-category.route")
const roleAdmin = require("./role.route")
const authRoute = require("./auth.route")
const accountsRoute = require("./accounts.route")
const authMiddware = require("../../middlewares/admin/auth.middware");
const myAccount = require("./my-account.route")
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard",
        authMiddware.authRequire,
        dashboardRoute);
        authMiddware.authRequire,
    app.use(PATH_ADMIN + "/product", authMiddware.authRequire,  productRoute);
    app.use(PATH_ADMIN + "/product-category", authMiddware.authRequire, productCategory);
    app.use(PATH_ADMIN + "/role", authMiddware.authRequire, roleAdmin);
    app.use(PATH_ADMIN + "/accounts", authMiddware.authRequire, accountsRoute)
    app.use(PATH_ADMIN + "/auth", authRoute)
    app.use(PATH_ADMIN + "/my-account", authMiddware.authRequire, myAccount)
};