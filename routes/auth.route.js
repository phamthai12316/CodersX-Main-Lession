var express = require('express');

var authController = require('../controllers/auth.controller');
var authValidate = require('../validate/auth.validate');
var router = express.Router();


router.get('/login', authController.login);

router.post('/login', authController.postLogin);

module.exports = router;