import EventSortView from '../view/event-sort-view';
import EventListView from '../view/event-list-view';
import EventItemView from '../view/event-item-view';
import EventFormView from '../view/event-form-view';

import {render, RenderPosition} from '../render';

export default class PointPresenter {
  pointModel = null;

  containerElement = null;
  eventListComponent = new EventListView();

  constructor(pointModel) {
    this.pointModel = pointModel;
  }

  init = (containerElement) => {
    this.containerElement = containerElement;

    render(new EventSortView(), this.eventListComponent.getElement());

    const points = [...this.pointModel.getPoints()]; // this.pointModel.getPoints().slice();

    render(new EventFormView(points[2]), this.eventListComponent.getElement());


    points.slice(1).forEach((point) => {
      render(new EventItemView(point), this.eventListComponent.getElement());
    });

    render(this.eventListComponent, this.containerElement);
  };
}
