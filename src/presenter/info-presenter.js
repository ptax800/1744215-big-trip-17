import { render } from '@framework/render';

import TripInfoView from '@view/trip/trip-info-view';
import TripInfoMainView from '@view/trip/trip-info-main-view';
import TripInfoCostView from '@view/trip/trip-info-cost-view';

class InfoPresenter {
  #containerElement = null;
  #pointsModel = null;
  #infoService = null;

  #infoView = null;
  #infoMainView = null;
  #infoCostView = null;

  constructor(containerElement, pointsModel, infoService) {
    this.#containerElement = containerElement;
    this.#pointsModel = pointsModel;
    this.#infoService = infoService;
  }

  init = () => {
    this.#pointsModel.addObserver(this.#handleModelEvent);

    this.#infoView = new TripInfoView();
    this.#infoMainView = new TripInfoMainView();
    this.#infoCostView = new TripInfoCostView();

    render(this.#infoMainView, this.#infoView.element);
    render(this.#infoCostView, this.#infoView.element);
    render(this.#infoView, this.#containerElement);
  };

  #handleModelEvent = () => {
    const points = this.#pointsModel.points;

    const cost = this.#infoService.getTotalCost(points);
    const names = this.#infoService.getDestinationNames(points);
    const dates = this.#infoService.getTripDates(points);

    this.#infoMainView.updateElement({ names, dates });
    this.#infoCostView.updateElement({ cost });
  };
}

export default InfoPresenter;
