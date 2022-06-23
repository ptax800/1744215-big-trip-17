import AbstractView from '@framework/view/abstract-view';

const createViewTemplate = () => (
  `<section class="trip-main__trip-info trip-info">
  </section>`
);

class TripInfoView extends AbstractView {
  get template() {
    return createViewTemplate();
  }
}

export default TripInfoView;
