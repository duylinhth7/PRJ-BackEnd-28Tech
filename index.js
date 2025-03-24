const express = require("express")
var path = require('path'); 
const cookieParser = require('cookie-parser');
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
const database = require("./config/database");
require('dotenv').config();
console.log("PORT from env:", process.env.PORT);
const routeAdmin = require("./routes/admin/index.rote");
const route = require("./routes/client/index.route");
database.connect();
const app = express();
const moment = require("moment");
const systemConfig = require("./config/system");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

const port = process.env.PORT;
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser()); // Thêm middleware này trước khi dùng req.cookies

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// end

// momment
app.locals.moment = moment;
//end
// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
routeAdmin(app);
route(app);
//ok
    
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})