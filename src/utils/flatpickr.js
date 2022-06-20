import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const setFlatpickr = (element, options = {}) =>
  flatpickr(element, {
    dateFormat: 'd/m/y H:i',
    enableTime: true,
    ...options,
  });

export {
  setFlatpickr,
};
