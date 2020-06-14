const got = require('got');

class Sitata {

    async getInfoByCountryCode(countryCode) {
        const headers = {
            'Organization': '437d1eb5-b5e3-4770-b9ce-7fdd6f2d788c',
            'Authorization': 'TKN VXNlcnw1YWQ5NDNlMzdhZmY1YTBlZTlmNDk4ZmF8V21LaFJXeDM2SG9hRWV6Yi1uVVI=',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        let responseObject = null;
        try {
            const response = await got(`https://www.sitata.com/api/v2/countries/${countryCode}/covid19_summary`, {
                headers: headers
            });
            responseObject = JSON.parse(response.body);
            console.log(response.url);
        } catch (error) {
            //Try some mock data
            responseObject = require('../mockData/sitata.json');
        }

        return responseObject;
    }

    printJson(json) {
        const jsonString = JSON.stringify(json, null, 2);
        console.log(jsonString);
    }
}

module.exports = Sitata;