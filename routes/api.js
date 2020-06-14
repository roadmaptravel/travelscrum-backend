const express = require('express');
const router = express.Router();
const ResponseNormalizer = require('../services/responseNormalizer');
const ResolveGeoName = require('../services/resolveGeoName');
const CityRating = require('../services/cityRating');
const CovidControls = require('../services/covidControls');

/* GET API response. */
router.get('/', async function (req, res, next) {
    const countryCode = req.query.countryCode;
    const cityName = req.query.cityName;
    const departureDate = req.query.departureDate;
    const returnDate = req.query.returnDate;

    //ResponseNormalizer
    const responseNormalizer = new ResponseNormalizer();
    responseNormalizer.setDates(departureDate, returnDate);

    //Geo Name
    const resolveGeoName = new ResolveGeoName();
    const geoName = resolveGeoName.fromCityName(cityName);
    responseNormalizer.setGeoName(geoName);

    //City Rating
    if (geoName && geoName.cityName) {
        const cityRating = new CityRating(geoName.cityName);
        const ratings = cityRating.getRatings();
        responseNormalizer.setCityRating(ratings);
    }

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