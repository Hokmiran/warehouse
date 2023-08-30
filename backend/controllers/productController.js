const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;
const { ObjectId } = require('mongodb');
const moment = require("moment-timezone");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
  const { productName, category, quantity, price, description } = req.body;

  //   Validation
  if (!productName || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Code Academy Warehouse",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const product = await Product.create({
    user: req.user.id,
    productName,
    // sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });
  res.status(201).json(product);
});



const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { nameFilter, categoryFilter, valueFilter, quantityFilter, dateFilter } = req.query;

  const startIndex = Math.max((page - 1) * limit, 0);

  const filter = {};

  if (nameFilter) {
    filter.productName = { $regex: nameFilter, $options: 'i' };
  }
  if (categoryFilter) {
    filter.category = categoryFilter;
  }
  if (valueFilter) {
    filter.price = parseFloat(valueFilter);
  }
  if (quantityFilter) {
    filter.quantity = parseInt(quantityFilter);
  }

  const allProducts = await Product.find(filter).sort({ createdAt: -1 }).populate('category', 'name');
  
  const userTimezone = "Asia/Baku";
  const formattedProducts = allProducts.map(product => ({
    ...product.toObject(),
    createdAt: moment.tz(product.createdAt, userTimezone).format("YYYY-MM-DD HH:mm:ss"),
  }));

  const filteredProducts = formattedProducts.filter(product => {
    if (dateFilter) {
      const startDate = moment.tz(dateFilter, userTimezone).startOf('day');
      const endDate = moment.tz(dateFilter, userTimezone).endOf('day');
      const productDate = moment.tz(product.createdAt, userTimezone);
      return productDate.isBetween(startDate, endDate, null, []);
    }
    return true;
  });

  const products = filteredProducts.slice(startIndex, startIndex + limit);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);

  const paginationInfo = {
    currentPage: page,
    totalPages,
    pageSize: limit,
    totalProducts,
  };

  res.status(200).json({ products, paginationInfo });
});




// Get Products by Category with Pagination
const getProductsByCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.category;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;

  const totalProducts = await Product.countDocuments({ category: categoryId });

  const products = await Product.find({ category: ObjectId(categoryId) })
    .skip(startIndex)
    .limit(limit)
    .populate('category', 'name');

  const userTimezone = "Asia/Baku";
  const formattedProducts = products.map(product => ({
    ...product.toObject(),
    createdAt: moment.tz(product.createdAt, userTimezone).format("YYYY-MM-DD HH:mm:ss"),
  }));

  const filteredProducts = formattedProducts.filter(product => {
    if (dateFilter) {
      const startDate = moment.tz(dateFilter, userTimezone).startOf('day');
      const endDate = moment.tz(dateFilter, userTimezone).endOf('day');
      const productDate = moment.tz(product.createdAt, userTimezone);
      return productDate.isBetween(startDate, endDate, null, []);
    }
    return true;
  });

  const totalPages = Math.ceil(totalProducts / limit);

  const paginationInfo = {
    currentPage: page,
    totalPages,
    pageSize: limit,
    totalProducts,
  };

  res.status(200).json({ products: filteredProducts, paginationInfo });
});




// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name');

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});



// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await product.remove();
  res.status(200).json({ message: "Product deleted." });
});



// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { productName, productImage, category, quantity, price, description, image } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Code Academy Warehouse",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      productName,
      productImage,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProductsByCategory,
  getProduct,
  deleteProduct,
  updateProduct,
};

