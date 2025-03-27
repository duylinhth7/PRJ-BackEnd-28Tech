const productRouter = require("./product.route");
const homeRouter = require("./home.route");
const categoryMiddlware = require("../../middlewares/client/productCategory.middware")
const search = require("./search.route")
const cartMiddlware = require("../../middlewares/client/cart.middleware")
const cartRouter = require("./cart.route")
module.exports = (app) => {
    app.use(categoryMiddlware.category);
    app.use(cartMiddlware.cart);
    app.use("/", homeRouter);
    app.use("/products", productRouter);
    app.use("/search", search);
    app.use("/cart", cartRouter)

};