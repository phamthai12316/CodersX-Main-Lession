var db = require('../db');
var shortid = require('shortid');

module.exports.index = (req, res) => {
  res.render('transfers/index');
}

module.exports.create = (req, res, next) => {
  res.render('transfers/create', { 
    csrfToken: req.csrfToken() 
  });
}

module.exports.postCreate = (req, res) => {
  var transfer = {
    id: shortid.generate(),
    amount : parseInt(req.body.amount),
    accountId : req.body.accountId,
    userId: req.signedCookies.userId
  } 
  
  db.get('transfers').push(transfer).write();
  res.redirect('/transfers/create');
}