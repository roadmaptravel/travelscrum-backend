const express = require('express');
const router = express.Router();
const covidControls = require('../services/covidControls');

/* GET API response. */
router.get('/', async function(req, res, next) {
    const countryCode = req.query.countryCode || "";
    const response = await covidControls(countryCode);

    res.send(response);
});

module.exports = router;