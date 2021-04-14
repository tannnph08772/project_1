const path = require('path');
const express = require('express');
const parser = require('body-parser');
const port = 3000;
const handlebar = require('express-handlebars');
const app = express();
const sequelize = require('./database/connection');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require("./src/api/middlewares/passport.middleware.js");
const router = require('./src/api/routes/index.route');
const Product = require('./src/api/models/product.model');
const User = require('./src/api/models/user.model');
const Cart = require('./src/api/models/cart.model');
const CartItem = require('./src/api/models/cartItem.model');
const Order = require('./src/api/models/order.model');
const OrderItem = require('./src/api/models/orderItem.model');
const Category = require('./src/api/models/category.model');
const staff = require('./src/api/models/staff.model');
const Payment = require('./src/api/models/payment.model');

initializePassport(passport);

app.engine(
    'hbs',
    handlebar({
        extname: '.hbs'
    }),
);
app.use(parser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname)));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('uploads/'));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false, cookie: { maxAge: 24 * 60 * 60 * 1000 } }));
app.use(passport.initialize());
app.use(passport.session());

router(app);

require('./src/api/middlewares/passport.middleware.js')(passport);

Category.hasMany(Product, {
    as: "products",
    foreignKey: 'cateId'
});

Product.belongsTo(Category, {
    as: "products",
    foreignKey: 'cateId'
});

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {
    through: OrderItem
});
Product.belongsToMany(Order, {
    through: OrderItem
});

app.use(function(req, res, next) {
    res.locals.user = req.user;
    console.log(res.locals)
    next();
});
// sequelize.sync().then(
//         result => {
//             return User.findByPk(1);
//         })
//     .then(user => {
//         if (!user) {
//             return User.create({
//                 username: 'Tannn',
//                 email: 'tan1511@gmail.com',
//                 password: 123456,
//                 phoneNumber: 123456789,
//                 sex: "nam",
//                 birthday: "2000-11-15",
//                 address: "ha noi"
//             })
//         }
//         return user;
//     })
//     .then(user => {
//         return user.createCart();
//     })
//     .then(cart => {
app.listen(port, () => {
        console.log(`Project http://localhost:${port}`)
    })
    // })
    // .catch(err => console.error(err));