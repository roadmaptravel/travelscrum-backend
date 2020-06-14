const express = require('express');
const router = express.Router();
const CovidControls = require('../services/CovidControls');
const ResolveGeoName = require('../services/ResolveGeoName');
const ResponseNormalizer = require('../services/ResponseNormalizer');

/* GET API response. */
router.get('/', async function (req, res, next) {
    const countryCode = req.query.countryCode;
    const cityName = req.query.cityName;

    const responseNormalizer = new ResponseNormalizer();

    //Geo Name
    const resolveGeoName = new ResolveGeoName();
    const geoName = resolveGeoName.fromCityName(cityName);
    responseNormalizer.setGeoName(geoName);

    //Covidcontrols API
    const covidControls = new CovidControls();
    const covidControlsParam = getCovidControlsParam(countryCode, geoName);
    const covidControlsResponse = await covidControls.getInfoByCountryId(covidControlsParam);
    responseNormalizer.setCovidControls(covidControlsResponse);

    res.send(responseNormalizer.getResponse());
});

function getCovidControlsParam(countryCode, geoName) {
    let covidControlsParam = null;

    if (!isEmpty(countryCode)) {
        covidControlsParam = countryCode;
    } else if (geoName) {
        covidControlsParam = geoName.stateCode || geoName.countryCode;
    }

    return covidControlsParam;
}

function isEmpty(str) {
    return (!str || 0 === str.length);
};

module.exports = router;