const productRouter = require("./product.route");
const homeRouter = require("./home.route");
const categoryMiddlware = require("../../middlewares/client/productCategory.middware")
module.exports = (app) => {
    app.use(categoryMiddlware.category);
    app.use("/", homeRouter);
    app.use("/products", productRouter);

};