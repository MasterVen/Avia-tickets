import api from '../services/apiService';

class Location {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
        this.airlines = null;
    }

    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines(),
        ]);
        const [counties, cities, airlines] = response;
        this.countries = this.serializeCountries(counties);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        this.airlines = this.serializeAirlines(airlines);

        return response;
    }

    getCityCodeByKey(key) {
            return this.cities[key].code;
        }

    getAirlineNameByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : '';
    }

    getAirlineLogoByCode(code) {
        return this.airlines[code] ? this.airlines[code].logo : '';
    }

    createShortCitiesList(cities) {
        // [key, value]
        // {'City, Country': null}
        // Object.entries => [key, value];
        return Object.entries(cities).reduce((acc, [key]) => {
            acc[key] = null;
            return acc;
        }, {})
    }

    serializeCountries(countries) {
        // {'Country code': {...}}
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }

    serializeCities(cities) {
        // { 'City name', Country name': {...} }
        return cities.reduce((acc, city) => {
            const countryCode = this.getCountryNameByCode(city.country_code);
            if (countryCode) {
                const key = `${city.name},${countryCode}`;
                acc[key] = city;
            }
            return acc;
        }, {});
    }

    serializeAirlines(airlines) {
        return airlines.reduce((acc, item) => {
            item.logo = `http://pics.avs.io/200/200/${item.code}.png`,
            item.name = item.name || item.name_translations.en;
            acc[item.code] = item;
            return acc;
        }, {});
    }

    getCountryNameByCode(code) {
        // {'Country code': {...}}
        if (this.countries[code]) {
            return this.countries[code].name;
        }

        // console.log(this.countries[code].time_zone);
        //
    }

    async fetchTickets(params) {
        const response = await this.api.prices(params);
        console.log(response);
    }
}

const location = new Location(api);

export default location;
