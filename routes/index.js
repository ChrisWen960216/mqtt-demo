const express = require('express');

const router = express.Router();

const tempController = require('../controller/temp');
/* GET home page. */
router.get('/temp/:deviceId', tempController);

module.exports = router;
