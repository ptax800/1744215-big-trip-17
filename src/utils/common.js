const ESCAPE_KEYS = ['Escape', 'Esc'];

const isEscEvent = (evt) => ESCAPE_KEYS.includes(evt.key);

const capitalizeFirstLetter = (text) =>
  text.length > 0
    ? `${text[0].toUpperCase()}${text.slice(1)}`
    : '';

export {
  isEscEvent,
  capitalizeFirstLetter,
};
