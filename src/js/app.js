import '../scss/style.scss';
import './plugins';
import location from './store/location';
import formUI from '@/js/views/form';
import currencyUI from '@/js/views/currency';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    const form = formUI.form;

    // Events
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    })


    // Handlers
    async function initApp() {
        await location.init();
        formUI.setAutocomleteData(location.shortCitiesList)
    }

    console.log(location);

    async function onFormSubmit() {
        // собрать даные из формы
        const origin = location.getCityCodeByKey(formUI.originValue);
        const destination = location.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue; // eslint-disable-line
        const return_date = formUI.returnDateValue; // eslint-disable-line
        const currency = currencyUI.currencyValue;
        // CODE, CODE, 2019-09, 2019-10

        await location.fetchTickets({
                origin,
                destination,
                depart_date,
                return_date,
                currency,
        })
    }
})
