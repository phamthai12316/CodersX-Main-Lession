var Transaction = require('../models/transaction.model')
var shortid = require('shortid');
// var db = require('../db');


module.exports.index = async (req, res) => {
  // var page = parseInt(req.query.page) || 1;
  // var perPage = 3;
  
  // var start = (page - 1) * perPage;
  // var end = page * perPage; 

  // var transaction = db.get('transactions').value().slice(start, end);

  var transaction = await Transaction.find();

  res.render('transactions/index',{
    transactions : transaction
  });
}
module.exports.create = (req,res) => { 
  var user = db.get('users').value();
  var book = db.get('books').value();
  res.render('transactions/create',{
    users: user,
    books: book,
  })
}
module.exports.postCreate = (req, res) => {
  var id = shortid.generate();
  var userId = req.body.userId;
  var bookId = req.body.bookId;
  var userName = db.get('users').find({ id: userId}).value().name;
  var bookTitle = db.get('books').find({ id: bookId}).value().title;
  var isComplete = false
  var transaction = {id, userId, bookId, userName, bookTitle, isComplete};
  db.get('transactions').push(transaction).write();
  res.redirect('/transactions');
}
module.exports.complete = (req, res) => {
  var id = req.params.id;
  var transaction = db.get('transactions').find({ id: id}).value();
  if(transaction){
    db.get('transactions').find({ id: transaction.id}).assign({isComplete: true}).write();
    res.redirect('/transactions');
  } else {
    res.send('404 Not Found');
  }
}