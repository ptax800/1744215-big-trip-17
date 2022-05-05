import EventSortView from '../view/event-edit-form-view.js';
// import EventFormView from '../view/new-event-form-view';
// import NewTravelButtonView from '../view/new-travel-button-view';
// import NewFiltres from '../view/new-filtres-view';
// import SortView from '../view/new-sort-view';
// import CreatePointView from '../view/new-point-travel-view';
import {render} from '../render';

export default class BoardPresenter {
  containerElement = null;

  init = (containerElement) => {
    this.containerElement = containerElement; // .trip-events (<section class="trip-events">)

    render(new EventSortView(), this.containerElement, render);

    // render(new EventEditFormView(), this.headerContainer);
    // render(new EventFormView(), this.headerContainer.getElement());
    // render(new NewTravelButtonView(), this.headerContainer.getElement());
    // render(new NewFiltres(), this.headerContainer.getElement());
    // render(new SortView(), this.headerContainer);
    // render(new CreatePointView(), this.headerContainer.getElement());

    // for (let i = 0; i < 3; i++) {
    //   render(new TaskView(), this.taskListComponent.getElement());
    // }

    // render(new LoadMoreButtonView(), this.boardComponent.getElement());
  };
}
