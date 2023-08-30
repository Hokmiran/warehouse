const ProductTransaction = require('../models/productTransactionModel');
const asyncHandler = require("express-async-handler");

const createTransaction = asyncHandler(async (req, res) => {
  try {
    const transaction = new ProductTransaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});


const getAllTransactions = asyncHandler(async (req, res) => {
  try {
    const transactions = await ProductTransaction.find().sort({createdAt: -1}).populate({"path" : "product employee"});
    res.send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
});

const getTransactionById = asyncHandler(async (req, res) => {
  try {
    const transaction = await ProductTransaction.findById(req.params.id).populate({"path" : "product employee"});
    if (!transaction) return res.status(404).json({"msg": "not found :("});
    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});

const updateTransaction = asyncHandler(async (req, res) => {
  try {
    const transaction = await ProductTransaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!transaction) return res.status(404).send();
    res.send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});

const deleteTransaction = asyncHandler(async (req, res) => {
  try {
    const transaction = await ProductTransaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).send();
    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
