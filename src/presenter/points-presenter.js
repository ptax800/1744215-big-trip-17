import EventSortView from '../view/event-sort-view';
import EventListView from '../view/event-list-view';
import PointPresenter from './point-presenter';

import { render, RenderPosition } from '../framework/render';
import { updateItemById } from '../utils/common';
import { sortPointsByTime, sortPointsByPrice } from '../utils/point';
import { SortType } from '../const';

class PointsPresenter {
  #pointModel = null;
  #destinations = [];

  #containerElement = null;
  #eventListView = new EventListView();
  #eventSortView = null;

  #pointPresenter = new Map();
  #points = [];
  #sourcedPoints = [];

  constructor(pointModel, destinations) {
    this.#pointModel = pointModel;
    this.#destinations = destinations;
  }

  init = (containerElement) => {
    this.#containerElement = containerElement;

    this.#points = [...this.#pointModel.points];
    this.#sourcedPoints = [...this.#pointModel.points];

    this.#renderSort();
    this.#renderList();
    this.#renderPoints();
  };

  #renderList = () => {
    render(this.#eventListView, this.#containerElement);
  };

  #renderSort = () => {
    if (this.#eventSortView === null) {
      this.#eventSortView = new EventSortView();
    }

    render(this.#eventSortView, this.#containerElement, RenderPosition.AFTERBEGIN);

    this.#eventSortView.setChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const presenter = new PointPresenter(
      this.#eventListView.element,
      this.#changeData,
      this.#changeMode,
    );

    presenter.init(point, this.#destinations);

    this.#pointPresenter.set(point.id, presenter);
  };

  #renderPoints = () => {
    // this.#points.forEach(this.#renderPoint);
    this.#renderPoint(this.#points[0]);
  };

  #clearList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortPointsByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointsByPrice);
        break;
      default: // SortType.DAY
        this.#points = [...this.#sourcedPoints];
    }
  };

  #changeData = (updatedPoint) => {
    this.#points = updateItemById(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedTask);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #changeMode = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearList();
    this.#renderPoints();
  };
}

export default PointsPresenter;
