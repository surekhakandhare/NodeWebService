var express = require('express');
var router = express.Router();
var stock_controller = require('../controller/stock.controller');


router.post('/stock_search', stock_controller.stock_search);
  
module.exports = router;
