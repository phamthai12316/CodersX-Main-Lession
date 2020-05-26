var express = require('express');

var productController = require('../controllers/product.controller');

var router = express.Router();

router.get('/', productController.index);

router.get('/search', productController.search);

router.get('/create', productController.create);

router.post('/create', productController.postCreate);

router.get('/:id', productController.view);

router.get('/:id/update', productController.update);

router.post('/:id/update', productController.postUpdate);

router.get('/:id/delete', productController.delete);

module.exports = router;


