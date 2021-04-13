var express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
// const { createproductValidate, validate } = require('../validators/createproduct.validate');
const authMiddleware = require('../middlewares/checkAuth.middleware');
const upload = require('../middlewares/upload.middleware')

router.get('/edit/:id', authMiddleware, productController.edit);
router.post('/update/:id', authMiddleware, productController.update);
router.post('/delete/:id', authMiddleware, productController.deleted);
router.post('/create', authMiddleware, productController.create);
router.get('/list-product', authMiddleware, productController.show)

module.exports = router;