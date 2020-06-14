
class ResolveGeoName {

    fromCityName(cityName) {
        let country = null;
        if (!cityName) {
            return country;
        } else if (cityName.toLowerCase() == 'amsterdam') {
            country = {
                cityName: 'Amsterdam',
                stateCode: null,
                countryName: 'The Netherlands',
                countryCode: 'NL'
            };
        } else {
            country = {
                cityName: 'New York',
                stateCode: "NY_US",
                countryName: 'United States of America',
                countryCode: 'US'
            };
        }

        return country;
    }
}

module.exports = ResolveGeoName;