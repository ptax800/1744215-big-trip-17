import AbstractView from '../framework/view/abstract-view';

const createTemplate = () => '<ul class="trip-events__list"></ul>';

export default class EventListView extends AbstractView {
  get template() {
    return createTemplate();
  }
}
