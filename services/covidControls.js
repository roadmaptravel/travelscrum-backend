const got = require('got');
const _ = require('lodash');

async function covidControls(countryId) {
    const headers = {'Authorization': 'Bearer getroadmap'};
    const searchParams = {'cId': countryId};
    const response = await got('https://prod.greatescape.co/api/travel/countries/corona/', {
        headers: headers,
        searchParams: searchParams
    });

    const obj = JSON.parse(response.body)
    const country = _.filter(obj, {'cId': countryId});
    // printJson(country)

    console.log(response.url);
    return JSON.stringify(country, null, 2)
}

function objectToArray(obj) {
    return Object.keys(obj).map(function(key) {
        return [Number(key), obj[key]];
      });
}

function printJson(json) {
    var jsonString = JSON.stringify(json, null, 2);
    console.log(jsonString);
}

module.exports = covidControls;