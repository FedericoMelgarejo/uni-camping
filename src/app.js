const express = require('express')
const app = express();

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

const methodOverride = require('method-override');

const session = require('express-session');
const localsUserCheck = require("./middlewares/localsUserCheck")

// view engine setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'Universo camping rules' }));
app.use(localsUserCheck)
app.use(methodOverride('_method'));

//rutas
const index = require('./routes/index')
const users = require('./routes/users')
const products = require('./routes/products')
const productsApi = require("./routes/api/productsApi")
const usersApi = require("./routes/api/usersApi")
const categoriesApi = require("./routes/api/categoriesApi")


//servidor
const PUERTO = process.env.PORT || 8080
app.listen(PUERTO, () => console.log("El servidor esta funcionando en el puerto " + PUERTO + " ---> http://localhost:" + PUERTO + "/"))

//URL
app.use('/', index)
app.use('/products', products)
app.use('/users', users)
app.use("/api/products", productsApi)
app.use("/api/users", usersApi)
app.use("/api/categories", categoriesApi)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
