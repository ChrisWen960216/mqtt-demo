const express = require('express');

const router = express.Router();

const TempController = require('../controller/temp');

/* GET home page. */
router.get('/temp/:deviceId', (request, response) => {
  const Temp = new TempController(request, response);
  return Temp.responseData();
});

module.exports = router;
