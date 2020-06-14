const got = require('got');

async function covidControls() {
    const headers = {'Authorization': 'Bearer getroadmap'};
    const response = await got('https://prod.greatescape.co/api/travel/countries/corona/', {
        headers: headers
    });

    return response.body
}

module.exports = covidControls;