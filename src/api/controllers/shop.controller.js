const Product = require('../models/product.model')
const Cart = require("../models/cart.model")
const Payment = require("../models/payment.model");
const status = require('../../../util/statusOrder')
const Order = require('../models/order.model');

exports.getCart = async(req, res) => {
    console.log(res.locals.check)
    req.user.getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then((product) => {
            res.json(product)
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQty = 1;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQty = product.cartItem.quantity;
                newQty = oldQty + 1;
                return product;
            } else {
                return Product.findByPk(prodId);
            }
        })
        .then((product) => {
            return fetchedCart.addProduct(product, {
                through: {
                    quantity: newQty,
                    total_price: new Number(newQty) * new Number(product.price),
                    price_item: product.price
                }
            });
        })
        .then((pr) => { res.json(pr) })
        .catch(err => console.error(err));
};

exports.updateCart = (req, res) => {
    const prodId = 2;
    let fetchedCart;
    let newQty = 1;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(products => {
            let product;

            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQty = product.cartItem.quantity;
                newQty = oldQty - 1;
                return product;
            } else {
                return Product.findByPk(prodId);
            }
        })
        .then((product) => {
            if (product.cartItem.quantity > 1) {
                return fetchedCart.addProduct(product, {
                    through: {
                        quantity: newQty,
                        total_price: new Number(newQty) * new Number(product.price),
                        price_item: product.price
                    }
                });
            } else {
                return product.cartItem.destroy();
            }
        })
        .then((pr) => res.json(pr))
        .catch(err => console.error(err));
};

exports.deleteItem = (req, res) => {
    const prodId = 1;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(products => {
            console.log(products)
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then((cart) => res.json(cart))
        .catch();
};


exports.getOrders = (req, res) => {
    req.user.getOrders({ include: ['products'] })
        .then(orders => {
            res.json(orders)
        })
        .catch(err => console.error(err));
};

exports.postOrder = (req, res) => {
    let fetchedCart;
    let totalOrder = 0;
    let Qty = 0;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            products.map(pro => {
                return [totalOrder += new Number(pro.cartItem.total_price), Qty += new Number(pro.cartItem.quantity)]
            })
            Order.create({ userId: req.user.id, total: totalOrder, quantity: Qty, status: status.unpaid })
                .then(order => {
                    return order.addProducts(products.map(pro => {
                        console.log(pro.cartItem.total_price, 1111)
                        pro.orderItem = {
                            quantity: pro.cartItem.quantity,
                            total_price: pro.cartItem.total_price,
                            price_item: pro.cartItem.price_item
                        };
                        return pro;
                    }));
                })
                .catch(err => console.error(err));
        })
        .then(result => {
            return fetchedCart.setProducts(null);
        })
        .then((result) => {
            res.json(result);
        })
        .catch(err => console.error(err));
}

exports.payment = async(req, res) => {
    await Order.findOne({ where: { id: req.params.id } }).then(
        async(order) => {
            const { paymentMethod, amount } = req.body;
            if (order.total <= amount) {
                await Order.update({ status: status.paid }, { where: { id: order.id } })

            } else {
                await Order.update({ status: status.missing }, { where: { id: order.id } })
                console.log("chưa thanh toán hết ")
            }
            Payment.create({
                staffId: 1,
                paymentMethod,
                amount,
                orderId: order.id
            }).then(payment => { return res.json(payment) })
        }
    )
}