import {createElement} from '../render.js';

const createButtonTemplate = () => (
  '<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>'
);



export default class EvenButtonView {
  get template() {
    return createButtonTemplate();
  }

  get element() {
    if (!this.element) {
      this.element = createElement(this.template);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
