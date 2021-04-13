module.exports = async() => {
    const Product = require('../src/api/models/product.model');
    const User = require('../src/api/models/user.model');
    const Cart = require('../src/api/models/cart.model');
    const CartItem = require('../src/api/models/cartItem.model');
    const Order = require('../src/api/models/order.model');
    const OrderItem = require('../src/api/models/orderItem.model');
    const Category = require('../src/api/models/category.model');
    const Staff = require('../src/api/models/staff.model');
    const Payment = require('../src/api/models/payment.model');

    User.hasOne(Cart);
    Cart.belongsTo(User);

    Cart.belongsToMany(Product, {
        through: CartItem
    });
    Product.belongsToMany(Cart, {
        through: CartItem
    });


    Category.hasMany(Product, {
        as: "products",
        foreignKey: 'cateId'
    });

    Product.belongsTo(Category, {
        as: "products",
        foreignKey: 'cateId'
    });

    Order.belongsTo(User, {
        as: "users",
        foreignKey: 'userId'
    });

    User.hasMany(Order, {
        as: "orders",
        foreignKey: 'userId'
    });

    Order.belongsToMany(Product, {
        through: OrderItem
    });

    Product.belongsToMany(Order, {
        through: OrderItem
    });
}