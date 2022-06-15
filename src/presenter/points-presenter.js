import EventSortView from '../view/event-sort-view';
import EventListView from '../view/event-list-view';
import PointPresenter from './point-presenter';

import { render, RenderPosition } from '../framework/render';
import { updateItemById } from '../utils/common';

class PointsPresenter {
  #pointModel = null;

  #containerElement = null;
  #eventListView = new EventListView();

  #pointPresenter = new Map();
  #points = [];

  constructor(pointModel) {
    this.#pointModel = pointModel;
  }

  init = (containerElement) => {
    this.#containerElement = containerElement;

    this.#points = [...this.#pointModel.points];

    this.#render();
  };

  #render = () => {
    this.#points.forEach(this.#renderPoint);
    // this.#renderPoint(this.#points[0]);

    render(new EventSortView(), this.#containerElement);
    render(this.#eventListView, this.#containerElement);
  }

  #renderPoint = (point) => {
    const presenter = new PointPresenter(
      this.#eventListView.element,
      this.#changeData,
      this.#changeMode,
    );

    presenter.init(point);

    this.#pointPresenter.set(point.id, presenter);
  }

  #changeData = (updatedPoint) => {
    this.#points = updateItemById(this.#points, updatedPoint);
    //this.#sourcedBoardTasks = updateItem(this.#sourcedBoardTasks, updatedTask);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #changeMode = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }
}

export default PointsPresenter;