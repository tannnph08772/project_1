const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const status = require('../../../util/statusOrder')

const getCart = (req, res) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then((product) => {
            res.json(product)
        })
        .catch(err => console.log(err));
};

const postCart = async(req, res) => {
    const prodId = 1;
    let fetchedCart;
    let newQty = 1;
    totalprice = 0;
    await req.user.createCart();
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
                const total = new Number(oldQty) * new Number(product.price);
                // console.log(product);
                newQty = oldQty + 1;
                totalprice = product.price;
                // console.log(totalprice);
                return product;
            } else {
                return Product.findByPk(prodId);
            }
        })
        .then((product) => {
            return fetchedCart.addProduct(product, {
                through: {
                    quantity: newQty,
                    total: new Number(newQty) * new Number(product.price)
                }
            });
        })
};

const deleteItem = (req, res) => {
    const prodId = 1;
    let fetchedCart;
    let newQty = 1;
    totalprice = 0;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then((products) => {
            const product = products[0];
            const oldQty = product.cartItem.quantity;
            const total = new Number(oldQty) * new Number(product.price);
            // console.log(product);
            newQty = oldQty - 1;
            totalprice = product.price;
            // console.log(totalprice);
            return product;
        })
        .then(async(product) => {
            if (newQty <= 0) {
                const abc = await Cart.findOne({ id: product.cartItem.dataValues.cartId });
                console.log(product.cartItem.dataValues.cartId);
                return [abc.destroy()];
            } else {
                fetchedCart.addProduct(product, {
                    through: {
                        quantity: newQty,
                        total: new Number(newQty) * new Number(product.price)
                    }
                });
            }
        })
        .then((pr) => res.json(pr))
        .catch(err => console.error(err));
};


const postCartDeleteProduct = (req, res) => {
    const prodId = 1;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(async(products) => {
            const product = products[0];
            const abc = await Cart.findOne({ id: product.cartItem.dataValues.cartId });
            return [abc.destroy(), product.cartItem.destroy()];
        })
        .then(() => res.send("ok"))
        .catch(err => console.error(err));
};

const getCheckout = async(req, res, next) => {
    await Cart.findAll()
        .then(cart => {
            res.json(cart);
        })
        .catch(err => console.log(err));
};

const getOrder = (req, res) => {
    req.user.getOrders({ include: ['products'] })
        .then(orders => {
            res.json(orders);
        })
        .catch(err => console.error(err));
};

const postOrder = (req, res) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            Order.create({ status: status.unpaid, userId: req.user.id })
                .then(order => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = {
                            quantity: product.cartItem.quantity,
                            totalprice: product.cartItem.total
                        };
                        console.log(product);
                        return product;
                    }));
                })
                .catch(err => console.error(err));
        })
        .then(result => {
            fetchedCart.setProducts(null);
        })
        .then((result) => {
            res.json(result);
        })
        .catch(err => console.error(err));
}

const submitOrder = async(req, res, next) => {
    const { status } = req.body;
    // Order.update({
    //         status: status.paid
    //     }, { where: { id: req.params.id } })
    //     .then(() => {
    //         res.send("Data was Updated");
    //     })
    //     .catch((err) => {
    //         console.log("Error : ", err)
    //     });
};

module.exports = {
    postCart,
    getCart,
    postCartDeleteProduct,
    getCheckout,
    getOrder,
    postOrder,
    submitOrder,
    deleteItem
}