var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  userId: String,
  bookId: String,
  userName: String,
  bookTitle: String,
  isComplete: Boolean
})

var Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;  
