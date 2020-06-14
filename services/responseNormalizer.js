class ResponseNormalizer {

    getResponse() {
        const response = {};
        if (this.geoName) {
            response.cityName = this.geoName.cityName;
            response.stateCode = this.geoName.stateCode;
            response.countryName = this.geoName.countryName;
            response.countryCode = this.geoName.countryCode;
        }

        if (this.cityRating) {
            response.colleagueRating = this.cityRating.colleagueRating;
            response.environmentalImpact = this.cityRating.environmentalImpact;
            response.wellBeing = this.cityRating.wellBeing;
        }

        if (this.covidControls) {
            this.printJson(this.covidControls);
            response.infected = this.covidControls.infected;
        }

        return JSON.stringify(response, null, 2);
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