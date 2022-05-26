import AbstractView from './abstract-view.js';

const createTemplate = () => '<ul class="trip-events__list"></ul>';

export default class EventListView extends AbstractView {
  get template() {
    return createTemplate();
  }
}
