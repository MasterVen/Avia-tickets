import 'materialize-css/dist/css/materialize.min.scss';
import 'materialize-css/dist/js/materialize.min';

// Init select
const select = document.querySelectorAll('select');
M.FormSelect.init(select); //eslint-disable-line

export function getSelectInstance(elem) {
    return M.FormSelect.getInstance(elem); //eslint-disable-line
}

const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete, { //eslint-disable-line
    data: {
        'Apple': null,
        'Microsoft': null,
        'Google': 'https://placehold.it/250x250',
    },
});

export function getAutocompleteInstance(elem) {
    return M.Autocomplete.getInstance(elem); //eslint-disable-line
}

// Init datepickers
const datepicker = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepicker, { //eslint-disable-line
    showClearBtn: true,
    format: 'yyyy-mm',
});

export function getDatePickerInstance(elem) {
    return M.Datepicker.getInstance(elem); //eslint-disable-line
}
