const productRouter = require("./product.route");
const homeRouter = require("./home.route");
const categoryMiddlware = require("../../middlewares/client/productCategory.middware")
const search = require("./search.route")
const cartMiddlware = require("../../middlewares/client/cart.middleware")
const cartRouter = require("./cart.route")
const checkoutRoute = require("./checkout.route")
const usersRoute = require("./users.route")
const usersMiddleware = require("../../middlewares/client/users.middleware")
module.exports = (app) => {
    app.use(categoryMiddlware.category);
    app.use(cartMiddlware.cart);
    app.use(usersMiddleware.users);
    app.use("/", homeRouter);
    app.use("/products", productRouter);
    app.use("/search", search);
    app.use("/cart", cartRouter)
    app.use("/checkout", checkoutRoute)
    app.use("/users", usersRoute)

};