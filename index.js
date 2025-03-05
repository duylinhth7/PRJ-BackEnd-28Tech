const express = require("express")
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
const database = require("./config/database");
require('dotenv').config();
console.log("PORT from env:", process.env.PORT);
const routeAdmin = require("./routes/admin/index.rote");
const route = require("./routes/client/index.route");
database.connect();
const app = express()
const systemConfig = require("./config/system");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

const port = process.env.PORT;
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'))



// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
routeAdmin(app);
route(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})