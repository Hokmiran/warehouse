const ProductCategory = require('../models/productCategoryModel');
const asyncHandler = require("express-async-handler");

const createProductCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body; // Extract the 'name' property from req.body
    const productCategory = new ProductCategory({ name }); // Create a new ProductCategory with the extracted name
    await productCategory.save();
    res.status(201).send(productCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

const getAllProductCategories = asyncHandler(async (req, res) => { // Changed function name to getAllProductCategories
  try {
    const productCategories = await ProductCategory.find(); // Changed variable name to productCategories
    res.send(productCategories);
  } catch (error) {
    res.status(500).send(error);
  }
});

const getProductCategoryById = asyncHandler(async (req, res) => {
  try {
    const productCategory = await ProductCategory.findById(req.params.id);
    if (!productCategory) return res.status(404).send();
    res.send(productCategory);
  } catch (error) {
    res.status(500).send(error);
  }
});

const updateProductCategory = asyncHandler(async (req, res) => {
  try {
    const productCategory = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!productCategory) return res.status(404).send();
    res.send(productCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

const deleteProductCategory = asyncHandler(async (req, res) => {
  try {
    const productCategory = await ProductCategory.findByIdAndDelete(req.params.id);
    if (!productCategory) return res.status(404).send();
    res.send(productCategory);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = {
  createProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  deleteProductCategory,
  updateProductCategory,
};