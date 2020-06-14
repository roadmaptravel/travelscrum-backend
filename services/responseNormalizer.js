class ResponseNormalizer {

    getResponse() {
        const response = {};
        response.dates = {};
        response.geoInfo = {};
        response.ratings = {};

        //Starting with separate pages
        response.pages = {}
        response.pages.country = {};
        response.pages.country.outbreak = {};
        response.pages.country.arriveDestination = {};
        response.pages.country.arriveHome = {};
        response.pages.country.visa = {};

        response.pages.city = {};
        response.pages.city.transport = {};
        response.pages.city.foodAndEntertainment = {};
        response.pages.city.office = {};

        response.pages.wellBeing = {};
        response.pages.wellBeing.health = {};
        response.pages.wellBeing.exercise = {};

        response.pages.environment = {};
        response.pages.environment.impactScore = {};

        response.pages.trustedPartners = {};

        this.amendWithMockData(response);

        if (this.departureDate) {
            response.dates.departureDate = this.departureDate
        }

        if (this.returnDate) {
            response.dates.returnDate = this.returnDate
        }

        if (this.geoName) {
            response.geoInfo.cityName = this.geoName.cityName;
            response.geoInfo.stateCode = this.geoName.stateCode;
            response.geoInfo.countryName = this.geoName.countryName;
            response.geoInfo.countryCode = this.geoName.countryCode;
        }

        if (this.cityRating) {
            response.ratings.colleagueRating = this.cityRating.colleagueRating;
            response.ratings.environmentalImpact = this.cityRating.environmentalImpact;
            response.ratings.wellBeing = this.cityRating.wellBeing;
        }

        if (this.covidControls) {
            response.pages.country.outbreak.totalCases = this.covidControls.sick;
            response.pages.country.outbreak.deathCases = this.covidControls.dead;
            response.pages.country.outbreak.recovered = this.getRecovered(this.covidControls.recovered);
            response.pages.country.outbreak.lockDown = this.covidControls.lockdownInfo.lockdown;
            response.geoInfo.lockDown = this.covidControls.lockdownInfo.lockdown;
            response.pages.country.outbreak.lastUpdated = this.getDateFromTimestamp(this.covidControls.lastUpdated);

            response.pages.city.transport.publicTransport = this.getTitleContentPair('Public transport', this.covidControls.lockdownInfo.transportMoreInfo);

            response.pages.city.foodAndEntertainment.restaurantsAndBars = this.getTitleContentPair('Restaurants', this.covidControls.lockdownInfo.restaurantsAndBars);
            response.pages.city.foodAndEntertainment.shopping = this.getTitleContentPair('Shopping', this.covidControls.lockdownInfo.shopping);
            response.pages.city.foodAndEntertainment.events = this.getTitleContentPair('Events', this.covidControls.lockdownInfo.eventMoreInfo);
            response.pages.city.foodAndEntertainment.touristAttractions = this.getTitleContentPair('Tourist attractions', this.covidControls.lockdownInfo.touristAttractions);
        }

        return JSON.stringify(response, null, 2);
    }

    amendWithMockData(response) {
        //Geo info
        response.geoInfo.approval = 'Approved';

        //Country - Outbreak
        response.pages.country.outbreak.infectedPopulation = '0.28%';
        response.pages.country.outbreak.deathPopulation = '0.03%';
        response.pages.country.outbreak.infectionRiskScore = '3/100';

        //Country - Arrive at destination
        response.pages.country.arriveDestination.entryRestrictions = this.getTitleContentPair('Entry restrictions', 'Most international travelers are not allowed to enter the Netherlands.');
        response.pages.country.arriveDestination.quarantine = this.getTitleContentPair('Recommended 14-day quarantine', 'All travelers arriving from high-risk areas found on the European Union Aviation Safety Agencies list are strongly advised to quarantine for 14 days upon arrival.');
        response.pages.country.arriveDestination.mandatoryHealthDeclaration = this.getTitleContentPair('Mandatory health declaration form before departure', 'Travelers are required to fill out a health declaration before boarding if they are arriving from a country on the European Union Aviation Safety Agencies high-risk areas list.');
        response.pages.country.arriveDestination.mandatoryBusinessLetter = this.getTitleContentPair('Mandatory essential business letter', 'Travelers are required to show an official business letter that proves their travel is essential.');

        //Country - Arrive at destination
        response.pages.country.arriveHome.entryRestrictions = this.getTitleContentPair('Entry restrictions', 'Travelers can’t enter the United States if they have visited selected countries in the past 14 days.');
        response.pages.country.arriveHome.quarantine = this.getTitleContentPair('Mandatory 14-day quarantine', 'All travelers that have been to a selected country within 14 days of their arrival are required to self-quarantine for 14 days at home.');
        response.pages.country.arriveHome.mandatoryBusinessLetter = this.getTitleContentPair('Mandatory essential business letter', 'Individual states may have their own restrictions and procedures in place. Check with local authorities for travel information before entering each US state.');

        //Country - Visa
        response.pages.country.visa.visa = this.getTitleContentPair('Visa', 'You don\'t need a visa. You can travel to Netherlands for a limited stay. Make sure to check other entry requirements and how long you can stay for.');
        response.pages.country.visa.stay = this.getTitleContentPair('Stay', '90 days within any 180-day period in the Schengen Area (European Netherlands)');
        response.pages.country.visa.passportValidity = this.getTitleContentPair('Passport validity', '6 months.');
        response.pages.country.visa.passport = this.getTitleContentPair('Passport', 'Your passport must have two blank page per entry.');
        response.pages.country.visa.currency = this.getTitleContentPair('Currency', 'Euros.');
        response.pages.country.visa.vaccination = this.getTitleContentPair('Vaccination', 'You do not require any vaccinations.');

        //City - Transport
        response.pages.city.transport.corporatePreferredTransport = this.getTitleContentPair('Nike preferred transport', 'You should use: private car service or taxi services.');
        response.pages.city.transport.corporateNonPreferredTransport = this.getTitleContentPair('Nike non-preferred transport', 'You should not use: car rental, public transport or ride sharing.');

        //City - Food & Entertainment
        response.pages.city.foodAndEntertainment.corporatePreferredConduct = this.getTitleContentPair('Nike preferred conduct', 'Please eat the hotel restaurant to ensure maximum safety and hygiene. Try to minimize shopping, attending events and visiting tourist attractions.');

        //City - Office
        response.pages.city.office.restrictions = this.getTitleContentPair('Restrictions', 'Open with social distancing of 1.5 meters.');

        //Well-being - Health
        response.pages.wellBeing.health.healthKit = this.getTitleContentPair('Health kit', 'You need to pick up a health kit from your local office.');
        response.pages.wellBeing.health.specialInsurance = this.getTitleContentPair('Special insurance', 'All Nike travelers have special travel insurance that covers all health incidents, including COVID-19 related hospital admittance.');
        response.pages.wellBeing.health.quarantineCost = this.getTitleContentPair('Quarantine cost', 'Nike covers all quarantine costs in case of mandatory quarantine upon entry, or when quarantined upon contact with an infected individual.');

        //Well-being - Exercise
        response.pages.wellBeing.exercise.corporateGyms = this.getTitleContentPair('Nike gyms', 'You have free access to all gyms that are connected to Nike Training Club.');
        response.pages.wellBeing.exercise.dailyAllowance = this.getTitleContentPair('Daily allowance', 'We believe in healthy travel at Nike; you can spend $20 every day to work out at any gym or sports club.');

        //Environment - Impact Score
        response.pages.environment.impactScore = this.getTitleContentPair('Environmental impact score ', 'Average sustainability score for this route, and 3 nights.<br \/><span class=\"font-weight-bold\" style=\"color: #FE8103;\">63/100<\/span>');
    }

    getTitleContentPair(title, content) {
        return { title: title, content: content }
    }

    getDateFromTimestamp(timestamp) {
        const date = new Date(this.covidControls.lastUpdated);
        //Just hardcode US date formatting
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    getRecovered(recovered) {
        let normalizedRecovered = 'Not reported';
        if (recovered && recovered > 0) {
            normalizedRecovered = recovered;
        }

        return normalizedRecovered;
    }

    setDates(departureDate, returnDate) {
        this.departureDate = departureDate;
        this.returnDate = returnDate;
    }

    setGeoName(geoName) {
        this.geoName = geoName;
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