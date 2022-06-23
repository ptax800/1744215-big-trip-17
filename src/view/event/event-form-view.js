import AbstractStatefulView from '@framework/view/abstract-stateful-view';

import { capitalizeFirstLetter } from '@util/common';
import { setFlatpickr } from '@util/flatpickr';

import { POINT_TYPES } from '@/const';

const getSaveButtonText = (isSaving) => isSaving ? 'Saving...' : 'Save';
const getDeleteButtonText = (isDeleting) => isDeleting ? 'Deleting...' : 'Delete';

const checkDestination = ({ description, pictures }) => description !== '' || pictures.length > 0;

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

const createTypeListTemplate = (currentType, types) => types
  .map((pointType) => createTypeItemTemplate(pointType, capitalizeFirstLetter(pointType), currentType === pointType))
  .join('');

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

const createDestinationTemplate = ({ destination }) => {
  const { description, pictures } = destination;

  const hasDescription = description !== '';
  const hasPictures = pictures.length > 0;

  const descriptionTemplate = hasDescription
    ? `<p class="event__destination-description">${description}</p>`
    : '';

  const picturesTemplate = hasPictures
    ? createPhotosContainerTemplates(pictures)
    : '';

  return (
    `<section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      ${descriptionTemplate}
      ${picturesTemplate}
    </section>`
  );
};

const createDestinationInputTemplate = ({ type, destination, destinationNames }) => (
  `<div class="event__field-group event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input
        class="event__input  event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value="${destination.name}"
        list="destination-list-1"
        required
      >
      <datalist id="destination-list-1">
        ${destinationNames.map((name) => `<option value="${name}"></option>`).join('')}
      </datalist>
  </div>`
);

const createOfferTemplate = ({ id, title, price, isChecked = false }) => (
  `<div class="event__offer-selector">
    <input 
      class="event__offer-checkbox visually-hidden" 
      id="event-offer-${id}" 
      type="checkbox" 
      name="event-offer"
      data-id="${id}"
      data-title="${title}""
      data-price="${price}"
      ${isChecked ? 'checked' : ''}
    >
    <label class="event__offer-label" for="event-offer-${id}">
      <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`
);

const createOffersSectionTemplate = (offers) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${offers.map(createOfferTemplate).join('')}
    </div>
  </section>`
);

const createViewTemplate = (state) => {
  const {
    type,
    dateFrom,
    dateTo,
    basePrice,
    availableOffers,
    hasOffers,
    hasDestination,
    isDisabled,
    isSaving,
    isDeleting,
    isNewMode,
  } = state;

  const destinationInputTemplate = createDestinationInputTemplate(state);
  const destinationSectionTemplate = hasDestination ? createDestinationTemplate(state) : '';
  const offersSectionTemplate = hasOffers ? createOffersSectionTemplate(availableOffers) : '';

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
      <input 
        class="event__input event__input--time" 
        id="event-start-time-1" 
        type="text" 
        name="event-start-time" 
        value="${dateFrom}"
        ${isDisabled ? 'disabled' : ''}
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input 
        class="event__input event__input--time" 
        id="event-end-time-1" 
        type="text" 
        name="event-end-time" 
        value="${dateTo}"
        ${isDisabled ? 'disabled' : ''}
      >
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input 
        class="event__input event__input--price" 
        id="event-price-1" 
        type="number" 
        min="1" 
        name="event-price"
        value="${basePrice}"
        required
        ${isDisabled ? 'disabled' : ''}
      >
    </div>

    <button class="event__save-btn btn btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${getSaveButtonText(isSaving)}</button>
    
    ${isNewMode
      ? '<button class="event__reset-btn" type="reset">Cancel</button>'
      : `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${getDeleteButtonText(isDeleting)}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`
    }
  </header>
  <section class="event__details">
    ${offersSectionTemplate}
    ${destinationSectionTemplate}
  </section>
  </form>
  </li>`
  );
};

class EventFormView extends AbstractStatefulView {
  #pointService = null;

  #startTimeFlatpickr = null;
  #endTimeFlatpickr = null;

  constructor(point, pointService) {
    super();

    this.#pointService = pointService;

    this._state = EventFormView.parsePointToState(point, pointService);

    this.#setInnerHandlers();
  }

  get template() {
    return createViewTemplate(this._state);
  }

  setRollupButtonClickHandler = (callback) => {
    if (! this._state.isNewMode) {
      this._callback.clickRollup = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollupButtonClick);
    }
  };

  setSaveButtonClickHandler = (callback) => {
    this._callback.clickSave = callback;
    this.element.addEventListener('submit', this.#onSubmit);
  };

  setDeleteButtonClickHandler = (callback) => {
    this._callback.clickDelete = callback;
  };

  setCancelButtonClickHandler = (callback) => {
    this._callback.clickCancel = callback;
  };

  removeElement = () => {
    super.removeElement();

    if (this.#startTimeFlatpickr !== null) { // if (this.#startTimeFlatpickr) { ... }
      this.#startTimeFlatpickr.destroy();
      this.#startTimeFlatpickr = null;
    }

    if (this.#endTimeFlatpickr !== null) {
      this.#endTimeFlatpickr.destroy();
      this.#endTimeFlatpickr = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      EventFormView.parsePointToState(point, this.#pointService),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();

    this.setRollupButtonClickHandler(this._callback.clickRollup);
    this.setSaveButtonClickHandler(this._callback.clickSave);
    this.setDeleteButtonClickHandler(this._callback.clickDelete);
    this.setCancelButtonClickHandler(this._callback.clickCancel);
  };

  #parseOffersCheckbox = ({ checkedOnly = false, onlyIds = false } = {}) => {
    const offersElements = this.element
      .querySelectorAll(`.event__offer-checkbox${checkedOnly ? ':checked' : ''}`);

    const offers = [];

    const eachOffersElements = onlyIds
      ? ({ dataset: { id } }) => {
        offers.push(+id);
      }
      : ({ dataset: { id, title, price }, checked: isChecked }) => {
        offers.push({ id: +id, title, price: +price, isChecked });
      };

    offersElements.forEach(eachOffersElements);

    return offers;
  };

  #setInnerHandlers = () => {
    const element = this.element;

    const destinationInputElement = element.querySelector('.event__input--destination');
    const priceInputElement = element.querySelector('.event__input--price');
    const typeGroupElement = element.querySelector('.event__type-group');

    destinationInputElement.addEventListener('focusin', this.#onDestinationInputFocusin);
    destinationInputElement.addEventListener('change', this.#onDestinationInputChange);
    priceInputElement.addEventListener('input', this.#onPriceInput);
    typeGroupElement.addEventListener('change', this.#onTypeGroupChange);
    element.addEventListener('reset', this.#onReset);

    this.#setFlatpickers();
  };

  #setFlatpickers = () => {
    const element = this.element;

    const startTimeInputElement = element.querySelector('#event-start-time-1');
    const endTimeInputElement = element.querySelector('#event-end-time-1');

    this.#startTimeFlatpickr = setFlatpickr(startTimeInputElement, {
      defaultDate: this._state.dateFrom,
      maxDate: this._state.dateTo,
      onClose: ([dateFrom]) => {
        this.#endTimeFlatpickr.set('minDate', dateFrom);
        this._setState({ dateFrom });
      },
    });

    this.#endTimeFlatpickr = setFlatpickr(endTimeInputElement, {
      defaultDate: this._state.dateTo,
      minDate: this._state.dateFrom,
      onClose: ([dateTo]) => {
        this.#startTimeFlatpickr.set('maxDate', dateTo);
        this._setState({ dateTo });
      },
    });

    startTimeInputElement.addEventListener('keydown', this.#onTimeInputKeydown);
    endTimeInputElement.addEventListener('keydown', this.#onTimeInputKeydown);
  };

  #onTimeInputKeydown = (evt) => {
    evt.preventDefault();
  };

  #onPriceInput = (evt) => {
    this._setState({ basePrice: evt.target.valueAsNumber });
  };

  #onDestinationInputFocusin = (evt) => {
    const target = evt.target;

    target.placeholder = target.value;
    target.value = '';

    const onTargetKeydown = (keydownEvt) => {
      keydownEvt.preventDefault();
    };

    target.addEventListener('focusout', () => {
      target.value = target.placeholder;
      target.removeEventListener('keydown', onTargetKeydown);
    }, { once: true });

    target.addEventListener('keydown', onTargetKeydown);
  };

  #onDestinationInputChange = (evt) => {
    evt.preventDefault();

    const destination = this.#pointService.getDestinationByName(evt.target.value);
    const availableOffers = this.#parseOffersCheckbox();

    this.updateElement({
      destination,
      availableOffers,
      hasDestination: checkDestination(destination),
      hasOffers: availableOffers.length > 0,
    });
  };

  #onTypeGroupChange = (evt) => {
    const type = evt.target.value;

    const availableOffers = Object.values(this.#pointService.getOffersByType(type));
    const hasOffers = availableOffers.length > 0;

    this.updateElement({ type, availableOffers, hasOffers });
  };

  #onRollupButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.clickRollup?.();
  };

  #onSubmit = (evt) => {
    evt.preventDefault();

    const point = EventFormView.parseStateToPoint(this._state);
    point.offers = this.#parseOffersCheckbox({ checkedOnly: true, onlyIds: true });

    this._callback.clickSave?.(point);
  };

  #onReset = (evt) => {
    evt.preventDefault();

    this._callback[this._state.isNewMode ? 'clickCancel' : 'clickDelete']?.();
  };

  static parsePointToState = (point, pointService) => {
    const { type, destination, dateFrom, dateTo, offers } = point;

    const availableOffers = pointService.getAvailableOffersByIds(type, offers);

    return {
      ...point,
      dateFrom: dateFrom !== null ? dateFrom : '',
      dateTo: dateTo !== null ? dateTo : '',
      destinationNames: pointService.getDestinationNames(),
      availableOffers,
      hasOffers: availableOffers.length > 0,
      hasDestination: checkDestination(destination),
      isNewMode: point.id === undefined,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  };

  static parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.destinationNames;
    delete point.availableOffers;
    delete point.hasOffers;
    delete point.hasDestination;
    delete point.isNewMode;
    delete point.isDisabled;
    delete point.isDeleting;
    delete point.isSaving;

    return point;
  };
}

export default EventFormView;

