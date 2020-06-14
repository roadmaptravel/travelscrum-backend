const express = require('express');
const router = express.Router();
const CovidControls = require('../services/CovidControls');
const ResolveGeoName = require('../services/ResolveGeoName');

/* GET API response. */
router.get('/', async function (req, res, next) {
    const countryCode = req.query.countryCode;
    const cityName = req.query.cityName;
    let covidControlsParam = null;

    if (isEmpty(countryCode)) {
        const resolveGeoName = new ResolveGeoName();
        const geoName = await resolveGeoName.fromCityName(cityName);
        if (geoName) {
            covidControlsParam = geoName.stateCode || geoName.countryCode;
        }
    } else {
        covidControlsParam = countryCode;
    }

    const covidControls = new CovidControls();
    const response = await covidControls.getInfoByCountryId(covidControlsParam);

    res.send(response);
});

function isEmpty(str) {
    return (!str || 0 === str.length);
}

module.exports = router;