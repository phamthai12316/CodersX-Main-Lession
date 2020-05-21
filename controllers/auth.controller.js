var db = require('../db');
var md5 = require('md5');
var bcrypt = require('bcrypt');

var shortid = require('shortid');



module.exports.login = (req, res, next) => {
  res.render('auth/login');
}

module.exports.postLogin = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  var saltRounds = 10;
  var myPlaintextPassword = password;
  var someOtherPlaintextPassword = 'not_bacon';
  var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

  var user = db.get('users').find({ email: email}).value();
  var wrongLoginCount = db.get('wrongLoginCount').value();
    // console.log(wrongLoginCount.length)
 
    if(wrongLoginCount.length > 3){
    res.render('auth/login',{
      errors: [
        'You cant login anymore!'
      ],
      values: req.body
    });
    // db.get('wrongLoginCount').push({ hash: hash}).write();
    return;
  }

  if(!user) {
    res.render('auth/login',{
      errors: [
        'Email does not exist.'
      ],
      values: req.body
    });
    return;
  } 

  // var hashedPassword = md5(password)

  // if(user.password !== hashedPassword) {
  if(!bcrypt.compareSync(user.password, hash)) {
    res.render('auth/login',{
      errors: [
        'Wrong password. If you try 4 times fail, you cant login'
      ],
      values: req.body
    });
    db.get('wrongLoginCount').push({ hash: hash}).write();
    return;
  }

  db.unset('wrongLoginCount').write();
  res.cookie('userId', user.id, {signed: true});
  res.redirect('/users')
}
