const express = require('express');
const router = express.Router();


const productTransactionController = require('../controllers/productTransactionController');

router.post('/transaction', productTransactionController.createTransaction);
router.get('/transactions', productTransactionController.getAllTransactions);
router.get('/transaction/:id', productTransactionController.getTransactionById);
router.put('/transaction/:id', productTransactionController.updateTransaction);
router.delete('/transaction/:id', productTransactionController.deleteTransaction);

module.exports = router;