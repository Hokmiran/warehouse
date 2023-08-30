const express = require('express');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
} = require("../controllers/productTransactionController");

router.post('/transactions', protect, createTransaction);
router.get('/transactions', protect, getAllTransactions);
router.get('/transactions/:id', protect, getTransactionById);
router.put('/transactions/:id', protect, updateTransaction);
router.delete('/transactions/:id', protect, deleteTransaction);

module.exports = router;