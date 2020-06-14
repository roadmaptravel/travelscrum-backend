const got = require('got');
const _ = require('lodash');

class CovidControls {

    async getInfoByCountryId(countryId) {
        const headers = { 'Authorization': 'Bearer getroadmap' };
        let searchParams = {};
        if (countryId) {
            searchParams.cId = countryId;
        }

        let responseObject = null;
        try {
            const response = await got('https://prod.greatescape.co/api/travel/countries/corona/', {
                headers: headers,
                searchParams: searchParams
            });
            responseObject = JSON.parse(response.body);
            console.log(response.url);
        } catch (error) {
            //Try some mock data
            responseObject = require('../mockData/covidControls.json');
        }

        const countryArray = _.filter(responseObject, { 'cId': countryId });
        let country = null;
        if (countryArray.length > 0) {
            country = countryArray[0];
        }
        // this.printJson(country)

        return country;
    }

    objectToArray(obj) {
        return Object.keys(obj).map(function (key) {
            return [Number(key), obj[key]];
        });
    }

    printJson(json) {
        var jsonString = JSON.stringify(json, null, 2);
        console.log(jsonString);
    }
}

module.exports = CovidControls;