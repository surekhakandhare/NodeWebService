var express = require('express');
var router = express.Router();
var auth_controller = require('../controller/authenticate.controller');


router.post('/authenticate', auth_controller.authenticate);
  
module.exports = router;
