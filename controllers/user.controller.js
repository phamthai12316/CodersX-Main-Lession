// var db = require('../db');
var User = require('../models/user.model');

var shortid = require('shortid');
var bcrypt = require('bcrypt');

module.exports.index = async (req, res) => {
  // var page = parseInt(req.query.page) || 1;
  // var perPage = 3;
  
  // var start = (page - 1) * perPage;
  // var end = page * perPage; 
  // var user = db.get('users').value();

  // var drop = (page - 1) * perPage;
  // var user = db.get('users').drop(drop).take(perPage).value();

  var user = await User.find();

  res.render('users/index',{
    users : user
  });
}
module.exports.search = (req,res) => {
  var q = req.query.q;
  var matchedUsers =  db.get('users').value().filter((user) => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index',{
    users: matchedUsers
  })
}
module.exports.create = (req,res) => {
  res.render('users/create')
}
module.exports.postCreate = (req,res) => {
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path.split('\\').slice(1).join('/');

  var myPlaintextPassword = req.body.password;
  var saltRounds = 10;

  var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
  req.body.password = hash;

  db.get('users').push(req.body).write();
  res.redirect('/users');
}

module.exports.view = (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id : id}).value();
  res.render('users/view',{
    users: user
  })
}
module.exports.delete = (req,res) => {
  var id = req.params.id;
  db.get('users').remove({id: id}).write();
  res.redirect('/users');
}
module.exports.update = (req,res) => {
  var id = req.params.id;
  var user = db.get('users').find({id : id}).value();
  res.render('users/update',{
    users: user
  })
}
module.exports.postUpdate = (req,res) => {
  var id = req.params.id;
  db.get('users').find({id : id}).assign({name : req.body.name}).write();
  res.redirect('/users');
}