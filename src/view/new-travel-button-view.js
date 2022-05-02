import {createElement} from '../render.js';

const createNewTravelButtonTemplate = () => '<button class="trip-main__event-add-btn">New event8</button>';

export default class NewTravelButtonView {
  getTemplate() {
    return createNewTravelButtonTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
