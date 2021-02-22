import '../scss/style.scss';
import './plugins';
import location from './store/location';

location.init().then(res => {
    console.log(res);
    console.log(location);
    console.log(location.getCitiesByCountryCode('PE'));
});
