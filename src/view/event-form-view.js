import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../const';

// edit mode
/*
  <button class="event__reset-btn" type="reset">Delete</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
**/

// new mode
/*
    <button class="event__reset-btn" type="reset">Cancel</button>
**/

// => const.js


//  ${type === 'flight' ? 'checked' : ''}
const createTypeItemTemplate = (id, text, isChecked = false) => (
  `<div class="event__type-item">
    <input
      id="event-type-${id}"
      class="event__type-input visually-hidden"
      type="radio"
      name="event-type"
      value="${id}"
      ${isChecked ? 'checked' : ''}
    >
    <label class="event__type-label event__type-label--${id}" for="event-type-${id}">${text}</label>
  </div>`
);
// createTypeItemTemplate('bus', 'Bus', true)

const createTypeListTemplate = (currentType, types) => types
  .map((pointType) => createTypeItemTemplate(pointType, capitalizeFirstLetter(pointType), currentType === pointType))
  .join('');

// => util.js
// const capitalizeFirstLetter = (text) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
const capitalizeFirstLetter = (text) =>
  text.length > 0
    ? `${text[0].toUpperCase()}${text.slice(1)}`
    : '';

// console.log(capitalizeFirstLetter('bus'));
// console.log(capitalizeFirstLetter(''));

const createOfferTemplate = ({ title, price, isChcked = false }) => (
  `<div class="event__offer-selector">
    <input
      class="event__offer-checkbox visually-hidden"
      id="event-offer-luggage-1"
      type="checkbox"
      name="event-offer-luggage"
      checked
    >
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`
);

const createPhotoTemplate = ({ src, description }) => (
  `<img class="event__photo" src="${src}" alt="${description}">`
);

const createPhotosContainerTemplates = (pictures) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map(createPhotoTemplate).join('')}
    </div>
  </div>`
);

const createDestinationTemplate = ({ destination, hasDescription, hasPictures }) => {
  const { description, pictures } = destination;

  const descriptionTemplate = hasDescription 
    ? `<p class="event__destination-description">${description}</p>` 
    : '';

  const picturesTemplate = hasPictures 
    ? reatePhotosContainerTemplates(pictures) 
    : '';
  
  return (
    `<section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      ${descriptionTemplate}
      ${picturesTemplate}
    </section>`
  );
};

const createDestinationInputTemplate = ({ type, destination: { name }, destinationNames }) => (
  `<div class="event__field-group event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input
        class="event__input  event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value="${name}"
        list="destination-list-1"
      >
      <datalist id="destination-list-1">
        ${destinationNames.map((name) => `<option value="${name}"></option>`).join('')}
      </datalist>
  </div>`
);

const createTemplate = (state) => {
  const { id, type, dateFrom, dateTo, basePrice, destination, hasDestination } = state;

  const destinationInputTemplate = createDestinationInputTemplate(state);
  const destinationSectionTemplate = hasDestination 
    ? createDestinationTemplate(state) 
    : '';

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${createTypeListTemplate(type, POINT_TYPES)}
        </fieldset>
      </div>
    </div>

    ${destinationInputTemplate}

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">Add luggage</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">30</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
          <label class="event__offer-label" for="event-offer-comfort-1">
            <span class="event__offer-title">Switch to comfort class</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">100</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
          <label class="event__offer-label" for="event-offer-meal-1">
            <span class="event__offer-title">Add meal</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">15</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
          <label class="event__offer-label" for="event-offer-seats-1">
            <span class="event__offer-title">Choose seats</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">5</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
          <label class="event__offer-label" for="event-offer-train-1">
            <span class="event__offer-title">Travel by train</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">40</span>
          </label>
        </div>
      </div>
    </section>

    ${destinationSectionTemplate}

  </section>
  </form>
  </li>`
  );
};

export default class EventFormView extends AbstractStatefulView {
  #destinations = [];
  
  constructor(point, destinations) {
    super(); // 1) new AbstractView

    this._state = { // EventFormView.parsePointToState
      ...point,
      hasDestination: point.destination.description !== '' || point.destination.pictures.length > 0,
      hasDescription: point.destination.description !== '',
      hasPictures: point.destination.pictures.length > 0,
      destinationNames: destinations.map(({ name }) => name),
    };

    this.#destinations = destinations;

    this.#setInnerHandlers();
  }

  get template() {
    return createTemplate(this._state);
  }

  setRollupButtonClickHandler = (callback) => {
    this._callback.clickRollup = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollupButtonClick);
  };

  setSaveButtonClickHandler = (callback) => {
    this._callback.clickSave = callback;
    this.element.addEventListener('submit', this.#onSubmit);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();

    this.setRollupButtonClickHandler(this._callback.clickRollup);
    this.setSaveButtonClickHandler(this._callback.clickSave);
  }

  #setInnerHandlers = () => {
    const element = this.element;
    const destinationInputElement = element.querySelector('.event__input--destination');
    const priceInputElement = element.querySelector('.event__input--price');

    // focusin: https://developer.mozilla.org/ru/docs/Web/API/Element/focusin_event
    destinationInputElement.addEventListener('focusin', this.#onDestinationInputFocusin);
    destinationInputElement.addEventListener('change', this.#onDestinationInputChange);
    priceInputElement.addEventListener('input', this.#onPriceInput);
  };

  #onPriceInput = (evt) => {
    this._setState({ basePrice: evt.target.valueAsNumber });
  };

  #onDestinationInputFocusin = (evt) => {
    const target = evt.target;

    target.placeholder = target.value;
    target.value = '';

    const onTargetKeydown = (evt) => {
      evt.preventDefault();
    };

    // focusout: https://developer.mozilla.org/ru/docs/Web/API/Element/focusout_event
    target.addEventListener('focusout', () => {
      target.value = target.placeholder;
      target.removeEventListener('keydown', onTargetKeydown);
    }, { once: true });

    target.addEventListener('keydown', onTargetKeydown);
  };

  #onDestinationInputChange = (evt) => {
    evt.preventDefault();

    const selectedName = evt.target.value;
    const destination = this.#destinations.find(({ name }) => name === selectedName);

    this.updateElement({ destination });
  };

  // Д4: on + (на каком элементе) + что случилось
  #onRollupButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.clickRollup?.();
  };

  // Д8: Методы внутри классов упорядочены
  #onSubmit = (evt) => {
    evt.preventDefault();
    this._callback.clickSave?.();
  };
}
