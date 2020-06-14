const express = require('express');
const router = express.Router();
const covidControls = require('../services/covidControls');

/* GET API response. */
router.get('/', async function(req, res, next) {

    const response = await covidControls();

    res.send('response = ' + response);
});

module.exports = router;