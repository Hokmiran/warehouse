const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productTransactionSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  transactionType: {
    type: String,
    enum: ['CHECKOUT', 'RETURN'],
    required: true
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true 
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

const ProductTransaction = mongoose.model('ProductTransaction', productTransactionSchema);

module.exports = ProductTransaction;
