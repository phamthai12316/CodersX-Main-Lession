var db = require('../db');

module.exports.requireAuth = (req, res, next) => {
  // if(!req.cookies.userId){
  if(!req.signedCookies.id){
    res.redirect('auth/login');
    return
  }

  var user = db.get('users').find({ id: req.signedCookies.userId}).value();

  if(!user){
    res.redirect('auth/login');
    return
  }

  res.locals.user = user;
  next();
}