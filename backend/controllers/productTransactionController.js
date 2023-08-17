const ProductTransaction = require('../models/productTransactionModel');

exports.createTransaction = async (req, res) => {
  try {
    const transaction = new ProductTransaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await ProductTransaction.find();
    res.send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await ProductTransaction.findById(req.params.id);
    if (!transaction) return res.status(404).send();
    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTransaction = async (req, res) => {
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
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await ProductTransaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).send();
    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
};
