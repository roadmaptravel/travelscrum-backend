class ResponseNormalizer {

    getResponse() {
        const response = {};

        if (this.geoName) {
            response.geoInfo = {};
            response.geoInfo.cityName = this.geoName.cityName;
            response.geoInfo.stateCode = this.geoName.stateCode;
            response.geoInfo.countryName = this.geoName.countryName;
            response.geoInfo.countryCode = this.geoName.countryCode;
        }

        if (this.cityRating) {
            response.ratings = {};
            response.ratings.colleagueRating = this.cityRating.colleagueRating;
            response.ratings.environmentalImpact = this.cityRating.environmentalImpact;
            response.ratings.wellBeing = this.cityRating.wellBeing;
        }

        //Starting with separate pages
        response.pages = {}
        response.pages.country = {};
        response.pages.city = {};
        response.pages.wellBeing = {};
        response.pages.sustainability = {};
        response.pages.environment = {};
        response.pages.trustedPartners = {};

        if (this.covidControls) {
            response.pages.country.totalCases = this.covidControls.sick;
            response.pages.country.deathCases = this.covidControls.dead;
            response.pages.country.lockDown = this.covidControls.lockdownInfo.lockdown;
            response.pages.country.lastUpdated = this.getDateFromTimestamp(this.covidControls.lastUpdated);
            response.pages.country.recovered = this.getRecovered(this.covidControls.recovered);

            response.pages.city.publicTransport = this.covidControls.lockdownInfo.transportMoreInfo;

            response.pages.city.restaurantsAndBars = this.covidControls.lockdownInfo.restaurantsAndBars;
            response.pages.city.shopping = this.covidControls.lockdownInfo.shopping;
            response.pages.city.eventMoreInfo = this.covidControls.lockdownInfo.eventMoreInfo;
            response.pages.city.touristAttractions = this.covidControls.lockdownInfo.touristAttractions;
        }

        return JSON.stringify(response, null, 2);
    }

    getDateFromTimestamp(timestamp) {
        const date = new Date(this.covidControls.lastUpdated);
        //Just hardcode US date formatting
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }

    getRecovered(recovered) {
        let normalizedRecovered = 'Not reported';
        if (recovered && recovered > 0) {
            normalizedRecovered = recovered
        }

        return normalizedRecovered;
    }

    setGeoName(geoName) {
        this.geoName = geoName
    }

    setCityRating(cityRating) {
        this.cityRating = cityRating;
    }

    setCovidControls(covidControls) {
        this.covidControls = covidControls;
    }

    printJson(json) {
        var jsonString = JSON.stringify(json, null, 2);
        console.log(`jsonString = ${jsonString}`);
    }
}

module.exports = ResponseNormalizer;