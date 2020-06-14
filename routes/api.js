const express = require('express');
const router = express.Router();
const ResponseNormalizer = require('../services/responseNormalizer');
const ResolveGeoInfo = require('../services/resolveGeoInfo');
const CityRating = require('../services/cityRating');
const CovidControls = require('../services/covidControls');
const Sherpa = require('../services/sherpa');

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
    const resolveGeoInfo = new ResolveGeoInfo();
    const geoInfo = resolveGeoInfo.fromCityName(cityName);
    responseNormalizer.setGeoInfo(geoInfo);

    //City Rating
    if (geoInfo && geoInfo.cityName) {
        const cityRating = new CityRating(geoInfo.cityName);
        const ratings = cityRating.getRatings();
        responseNormalizer.setCityRating(ratings);
    }

    //Covidcontrols API
    const covidControls = new CovidControls();
    const covidControlsParam = getCovidControlsParam(countryCode, geoInfo);
    const covidControlsResponse = await covidControls.getInfoByCountryId(covidControlsParam);
    responseNormalizer.setCovidControls(covidControlsResponse);

    //Sherpa API
    if (geoInfo && geoInfo.countryCode && geoInfo.countryCode3) {
        const sherpa = new Sherpa();
        const shearpaResponse = await sherpa.getInfoByCountryId(geoInfo.countryCode, geoInfo.countryCode3);
        responseNormalizer.setSherpa(shearpaResponse);
    }

    res.send(responseNormalizer.getResponse());
});

function getCovidControlsParam(countryCode, geoInfo) {
    let covidControlsParam = null;

    if (!isEmpty(countryCode)) {
        covidControlsParam = countryCode;
    } else if (geoInfo) {
        covidControlsParam = geoInfo.stateCode || geoInfo.countryCode;
    }

    return covidControlsParam;
}

function isEmpty(str) {
    return (!str || 0 === str.length);
};

module.exports = router;