const express = require('express');

const router = express.Router();

const TemperatureController = require('../controller/temperature');
/* GET home page. */
router.get('/temp', TemperatureController.getData);

module.exports = router;
