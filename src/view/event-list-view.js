import {createElement} from '../render.js';

const createTemplate = () => '<ul class="trip-events__list"></ul>';

export default class EventListView {
  get template() {
    return createTemplate();
  }

  get element() {
    if (!this.element) {
      this.element = createElement(this.template());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
