const express = require('express');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");

const productCategoryController = require('../controllers/productCategoryController');

// ProductCategory routes
router.post('/categories', protect, productCategoryController.createProductCategory);
router.get('/categories', protect, productCategoryController.getAllProductCategories);
router.get('/categories/:id', protect, productCategoryController.getProductCategoryById);
router.put('/categories/:id', protect, productCategoryController.updateProductCategory);
router.delete('/categories/:id', protect, productCategoryController.deleteProductCategory);


module.exports = router;