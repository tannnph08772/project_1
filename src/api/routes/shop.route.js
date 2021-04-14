const express = require('express');
const shopController = require('../controllers/shop.controller');
const authMiddleware = require('../middlewares/checkAuth.middleware');
const CheckCart = require('../middlewares/cart.middleware');
const { PaymentValidate, validate } = require('../validators/createPayment.validate');
const router = express.Router();

router.get('/cart', isLoggedIn, CheckCart.check, shopController.getCart);
router.post('/add-to-cart', isLoggedIn, CheckCart.check, shopController.postCart);
router.get('/orders', isLoggedIn, shopController.getOrders);
router.post('/cart-delete-item', isLoggedIn, shopController.deleteItem);
router.post('/create-order', isLoggedIn, shopController.postOrder);
router.post('/update-cart', isLoggedIn, shopController.updateCart);
router.post('/payment/:id', isLoggedIn, PaymentValidate(), validate, shopController.payment);

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        res.locals.user = req.user
        return next()
    }

    res.send('Vui lòng đăng nhap');

}
module.exports = router;