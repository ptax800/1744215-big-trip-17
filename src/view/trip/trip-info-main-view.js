import AbstractView from '@framework/view/abstract-view';

import { formatEventDate } from '@util/date';

const createViewTemplate = () => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title"></h1>
    <p class="trip-info__dates"></p>
  </div>`
);

const formatDestinationNames = (names) => names.length > 3
  ? `${names.at(0)} — ... — ${names.at(-1)}`
  : `${names.join(' — ')}`;

const formatTripDates = ({ dateStart, dateEnd }) =>
  `${formatEventDate(dateStart)} — ${formatEventDate(dateEnd)}`;

class TripInfoMainView extends AbstractView {
  get template() {
    return createViewTemplate();
  }

  updateElement = ({ names, dates }) => {
    const element = this.element;

    element.querySelector('.trip-info__title').textContent = formatDestinationNames(names);
    element.querySelector('.trip-info__dates').textContent = formatTripDates(dates);
  };
}

export default TripInfoMainView;
