const express = require('express');
const router = express.Router();

const productCategoryController = require('../controllers/productCategoryController');

// ProductCategory routes
router.post('categories', productCategoryController.createProductCategory);
router.get('categories', productCategoryController.getAllProductCategorys);
router.get('categories/:id', productCategoryController.getProductCategoryById);
router.put('categories/:id', productCategoryController.updateProductCategory);
router.delete('categories/:id', productCategoryController.deleteProductCategory);


module.exports = router;