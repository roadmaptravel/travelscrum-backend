class CityRating {

    constructor(cityName) {
        this.cityName = cityName.toLowerCase;
    }

    getRatings() {
        return {
            colleagueRating: this.getColleagueRating(),
            environmentalImpact: this.getEnvironmentalImpact(),
            wellBeing: this.getWellBeing()
        }
    }

    getColleagueRating() {
        let rating = 4;
        if (cityName === 'amsterdam') {
            rating = 5;
        }

        return rating;
    }

    getEnvironmentalImpact() {
        let rating = 4;
        if (cityName === 'amsterdam') {
            rating = 3;
        }

        return rating;
    }

    getWellBeing() {
        let rating = 5;
        if (cityName === 'amsterdam') {
            rating = 4;
        }

        return rating;
    }
}

module.exports = CityRating;