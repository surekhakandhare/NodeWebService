var express = require('express');
var router = express.Router();
var log_controller = require('../controller/logger.controller');


router.post('/addLoginData', log_controller.addLoginData);
  
module.exports = router;
