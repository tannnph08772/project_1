const express = require('express');
const shopController = require('../controllers/shop.controller');
const authMiddleware = require('../middlewares/checkAuth.middleware');
const passport = require('passport');
const router = express.Router();

router.get('/cart', authMiddleware, shopController.getCart);
router.post('/add-to-cart', authMiddleware, shopController.postCart);
router.get('/orders', authMiddleware, shopController.getOrders);
router.post('/cart-delete-item', authMiddleware, shopController.deleteItem);
router.post('/create-order', authMiddleware, shopController.postOrder);
router.post('/update-cart', authMiddleware, shopController.updateCart);
router.post('/payment/:id', authMiddleware, shopController.payment);

module.exports = router;