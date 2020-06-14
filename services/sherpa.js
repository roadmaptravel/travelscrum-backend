const got = require('got');

class Sherpa {

    async getInfoByCountryId(countryCode2, countryCode3) {
        const response = {}
        //Skipping the countries API as it doesn't seem to have very much relevant data
        // response.countries = JSON.parse(await this.callSherpaCountries(countryCode3));
        response.restrictions = JSON.parse(await this.callSherpaRestrictions(countryCode3));
        response.procedures = JSON.parse(await this.callSherpaProcedures(countryCode3));

        return response;
    }

    callSherpaCountries(countryCode3) {
        const searchParams = {
            'filter[country]': countryCode3
        };
        return this.callSherpa('countries', searchParams);
    }

    callSherpaRestrictions(countryCode3) {
        // const searchParams = {};
        // return this.callSherpa(`countries/${countryCode3}`, searchParams);
        const searchParams = {
            'filter[country]': countryCode3
        };
        return this.callSherpa('restrictions', searchParams);
    }

    callSherpaProcedures(countryCode3) {
        const searchParams = {
            'filter[country]': countryCode3
        };
        return this.callSherpa(`procedures`, searchParams);
    }

    async callSherpa(apiType, searchParams) {
        // console.log(`callSherpa(${apiType}, ${printJson(searchParams)})`);
        searchParams.key = 'AIzaSyDVHRanQhyIEOa1IxVDgzDIT5ks2U4G8_Q';

        const response = await got(`https://requirements-api.sandbox.joinsherpa.com/v2/${apiType}`, {
            searchParams: searchParams
        });

        console.log(response.url);
        return response.body;
    }

    objectToArray(obj) {
        return Object.keys(obj).map(function (key) {
            return [Number(key), obj[key]];
        });
    }

    printJson(json) {
        const jsonString = JSON.stringify(json, null, 2);
        console.log(jsonString);
    }
}

module.exports = Sherpa;