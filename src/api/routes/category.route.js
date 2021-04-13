var express = require('express');
const router = express.Router();
const cateController = require('../controllers/category.controller');
const { createCategoryValidate, validate } = require('../validators/createCategory.validate');
const authMiddleware = require('../middlewares/checkAuth.middleware')


router.get('/edit/:id', authMiddleware, cateController.edit);
router.post('/update/:id', authMiddleware, cateController.update);
router.post('/delete/:id', authMiddleware, cateController.deleted);
router.post('/create', authMiddleware, createCategoryValidate(), validate, cateController.create);
router.get('/list-category', authMiddleware, cateController.show)

module.exports = router;