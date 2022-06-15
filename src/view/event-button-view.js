import AbstractView from '../framework/view/abstract-view';

const createButtonTemplate = () => (
  '<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>'
);

export default class EvenButtonView extends AbstractView {
  get template() {
    return createButtonTemplate();
  }
}
