var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var shortid = require('shortid');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views')

app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// app.get('/', function(req, res){
//   res.send('<h1>Hello Coders.Tokyo</h1><a href="/users">User list</a>');
// })


app.get('/', function(req, res){
  res.render('index',{
    name: "Thai"
  });
})
app.get('/users', function(req, res){
  res.render('users/index',{
    users : db.get('users').value()
  });
})

app.get('/users/search', function(req,res){
  var q = req.query.q;
  var matchedUsers =  db.get('users').value().filter(function(user){
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index',{
    users: matchedUsers
  })
})

app.get('/users/create', function(req,res){
  res.render('users/create')
})

app.post('/users/create',function(req,res){
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users')
})

app.get('/users/:id',function(req,res){
  var id = req.params.id;
  var user = db.get('users').find({id : id}).value();
  res.render('users/view',{
    users: user
  })
})

app.get('/users/:id/delete', function(req,res){
  var id = req.params.id;
  db.get('users').remove({id: id}).write();
  res.redirect('/users');
})


app.get('/users/:id/update', function(req,res){
  var id = req.params.id;
  var user = db.get('users').find({id : id}).value();
  res.render('users/update',{
    users:user
  })
})

app.post('/users/:id/update', function(req,res){
  var id = req.params.id;
  var user = db.get('users').find({id : id}).assign({name : req.body.name}).write();
  res.redirect('/users');
})

app.listen(port, function(){
  console.log('Sever listening on port ' + port)
})