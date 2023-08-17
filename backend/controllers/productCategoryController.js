const ProductCategory = require('../models/productCategoryModel');

exports.createProductCategory = async (req, res) => {
  try {
    const productCategory = new ProductCategory(req.body);
    await productCategory.save();
    res.status(201).send(productCategory);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllProductCategorys = async (req, res) => {
  try {
    const productCategorys = await ProductCategory.find();
    res.send(productCategorys);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProductCategoryById = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findById(req.params.id);
    if (!productCategory) return res.status(404).send();
    res.send(productCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateProductCategory = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!productCategory) return res.status(404).send();
    res.send(productCategory);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteProductCategory = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findByIdAndDelete(req.params.id);
    if (!productCategory) return res.status(404).send();
    res.send(productCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};