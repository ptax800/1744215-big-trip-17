import EventSortView from '../view/event-sort-view';
import EventListView from '../view/event-list-view';
import EventEditFormView from '../view/event-edit-form-view';
import EventItemView from '../view/event-item-view';

import {render, RenderPosition} from '../render';

export default class BoardPresenter {
  containerElement = null;
  eventListComponent = new EventListView();

  init = (containerElement) => {
    this.containerElement = containerElement;
    render(new EventSortView(), this.eventListComponent.getElement());
    render(new EventEditFormView(), this.eventListComponent.getElement());


    for(let i = 0; i < 9; i++){
      render(new EventItemView(), this.eventListComponent.getElement());
    }
    render(this.eventListComponent, this.containerElement);
  };
}
