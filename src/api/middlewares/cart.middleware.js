const Product = require('../models/product.model');;
const Cart = require("../models/cart.model");
const Payment = require("../models/payment.model");
const status = require('../../../util/statusOrder');
const Order = require('../models/order.model');

module.exports.check = async(req, res, next) => {
    const shopCart = await Cart.findOne({ where: { userId: req.user.id } })
    if (!shopCart) {
        req.user.createCart();
        return next();
    }
    return next();
};