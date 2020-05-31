var express = require('express');

var transferController = require('../controllers/transfer.controller');

var router = express.Router();

router.get('/', transferController.index);

router.get('/create', transferController.create);

router.post('/create', transferController.postCreate);

module.exports = router;


