import api from '../services/apiService';

class Location {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
    }

    async init() {
        const response = await Promise.all([
            this.api.cities(),
            this.api.countries(),
        ]);
        const [counties, cities] = response;
        this.countries = counties;
        this.cities = cities;
        return response;
    }

    getCitiesByCountryCode(code) {
        return this.countries.filter(city => city.country_code === code);
    }
}

const location = new Location(api);

export default location;
