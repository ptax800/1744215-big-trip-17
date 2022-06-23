import AbstractView from '@framework/view/abstract-view';

const createViewTemplate = () => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
  </p>`
);

class TripInfoCostView extends AbstractView {
  get template() {
    return createViewTemplate();
  }

  updateElement = ({ cost }) => {
    this.element.querySelector('.trip-info__cost-value').textContent = cost;
  };
}

export default TripInfoCostView;
