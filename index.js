require('dotenv').config()

var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

var csurf = require('csurf',{cookie: true});

var userRoute = require('./routes/user.route');
var bookRoute = require('./routes/book.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var authRoute = require('./routes/auth.route');
var transferRoute = require('./routes/transfer.route');
var transactionRoute = require('./routes/transaction.route');


var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware')

// var cookie = require('./middlewares/cookie.middleware');

var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views')

app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(cookieParser(process.env.SESSION_SECRET))

app.use(sessionMiddleware);
app.use(csurf({cookie: true}));

app.use(express.static('public')) 
// app.get('/', function(req, res){
//   res.send('<h1>Hello Coders.Tokyo</h1><a href="/users">User list</a>');
// })

app.get('/', (req, res) => {
  res.render('index',{
    name: "Thai"
  });
})

// app.use(cookie.cookie);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);
app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/books',authMiddleware.requireAuth, bookRoute);
app.use('/products',authMiddleware.requireAuth,productRoute);
app.use('/transactions',authMiddleware.requireAuth, transactionRoute);
app.use('/transfers',authMiddleware.requireAuth,transferRoute);



app.listen(port, function(){
  console.log('Sever listening on port ' + port)
})