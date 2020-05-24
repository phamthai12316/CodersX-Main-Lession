var db = require('../db');
var md5 = require('md5');
var bcrypt = require('bcrypt');
const mailgun = require("mailgun-js");

var shortid = require('shortid');

module.exports.login = (req, res, next) => {
  res.render('auth/login');
}

module.exports.postLogin = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get('users').find({ email: email}).value();
 
  if(user.wrongLoginCount > 3){

  const DOMAIN = "sandbox0ea1f4449391474d9d5700d252110263.mailgun.org";
  const mg = mailgun({apiKey: "a8a68f81a695da554baddd09c85947d7-e5e67e3e-8593af85", domain: DOMAIN});
  const data = {
    from: "Mailgun Sandbox <postmaster@sandbox0ea1f4449391474d9d5700d252110263.mailgun.org>",
    to: "phamthai12316@gmail.com",
    subject: "Hello",
    text: "Testing some Mailgun awesomness!"
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
  res.render('auth/login',{
    errors: [
      'You cant login anymore!'
    ],
  });
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
  if(!bcrypt.compareSync(password, user.password)) {
    var newValue = (user.wrongLoginCount += 1);
    db.get('users').assign({wrongLoginCount : newValue}).write();
    res.render('auth/login',{
      errors: [
        'Wrong password. If you try 4 times fail, you cant login'
      ],
      values: req.body
    });
    return;
  }

  res.cookie('userId', user.id, {signed: true});
  res.redirect('/users');
}
