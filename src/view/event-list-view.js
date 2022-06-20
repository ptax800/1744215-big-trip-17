import AbstractView from '../framework/view/abstract-view';

const createViewTemplate = () => '<ul class="trip-events__list"></ul>';

class EventListView extends AbstractView {
  get template() {
    return createViewTemplate();
  }
}

export default EventListView;
