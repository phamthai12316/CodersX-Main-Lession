var express = require('express');
var multer  = require('multer')

var userController = require('../controllers/user.controller');
var userValidate = require('../validate/user.validate');
var router = express.Router();

var upload = multer({ dest: './public/uploads/' })

router.get('/', userController.index);

router.get('/search', userController.search);

router.get('/create', userController.create);

router.post('/create', upload.single('avatar'), userValidate.postCreate, userController.postCreate);

router.get('/:id', userController.view);

router.get('/:id/delete', userController.delete);

router.get('/:id/update', userController.update);

router.post('/:id/update', userController.postUpdate);

module.exports = router;