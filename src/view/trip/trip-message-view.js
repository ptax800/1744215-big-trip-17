import AbstractView from '@framework/view/abstract-view';

const createViewTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

class TripMessageView extends AbstractView {
  #message = '';

  constructor(message) {
    super();

    this.#message = message;
  }

  get template() {
    return createViewTemplate(this.#message);
  }
}

export default TripMessageView;
