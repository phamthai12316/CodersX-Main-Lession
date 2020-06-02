var Product = require('../models/product.model');
var db = require('../db');
var shortid = require('shortid');

module.exports.index = async (req, res) => {
  // var page = parseInt(req.query.page) || 1;
  // var perPage = 8;
  
  // var start = (page - 1) * perPage;
  // var end = page * perPage; 

  // var product = db.get('products').value().slice(start, end);
 
  // var drop = (page - 1) * perPage;
  // var product = db.get('products').drop(drop).take(perPage).value();

  var product = await Product.find();
  res.render('products/index',{
    products: product
  });
}

module.exports.search = async (req, res) => {
  var q = req.query.q;
  // var product = await Product.find();

  // var matchedProduct = db.get('products').value().filter((product) => {
  var matchedProduct = await Product.filter((product) => {
    return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  res.render('products/index',{
    products: matchedProduct
  })
}

module.exports.create = (req, res) => {
  res.render('products/create');
}

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  
  db.get('products').push(req.body).write();
  req.redirect('/products')
}

module.exports.view = (req, res) => {
  var id = req.params.id;
  var product = db.get('products').find({id : id}).value();

  res.render('products/view',{
    products: product
  })
}

module.exports.update = (req, res) => {
  var id = req.params.id;
  var product = db.get('products').find({id: id}).value();
  res.render('/products/update', {
    products: product
  })
}

module.exports.postUpdate = (req, res) => {
  var id = req.params.id;
  db.get('products').find({id: id}).assign({name: req.body.name,image: req.body.image, price: req.body.price, description: req.body.description}).write();
  res.redirect('/products')
}

module.exports.delete = (req, res) => {
  var id = req.params.id;
  db.get('products').remove({ id: id}).write();
  res.redirect('/products');
}