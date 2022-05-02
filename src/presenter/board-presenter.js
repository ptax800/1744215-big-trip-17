import EventEditFormView from '../view/new-event-edit-view';
import EventFormView from '../view/new-event-form-view';
import NewTravelButtonView from '../view/new-travel-button-view';
import NewFiltres from '../view/new-filtres-view';
import NewSorts from '../view/new-sort-view';
import CreatePointView from '../view/new-point-travel-view';
import {render} from '../render.js';

export default class BoardPresenter {
  headerContainer = document.querySelector('.page-header__container');

  init = (headerContainer) => {
    this.headerContainer = headerContainer;

    render(new EventEditFormView(), this.headerContainer.getElement());
    render(new EventFormView(), this.headerContainer.getElement());
    render(new NewTravelButtonView(), this.headerContainer.getElement());
    render(new NewFiltres(), this.headerContainer.getElement());
    render(new NewSorts(), this.headerContainer.getElement());
    render(new CreatePointView(), this.headerContainer.getElement());

    // for (let i = 0; i < 3; i++) {
    //   render(new TaskView(), this.taskListComponent.getElement());
    // }

    // render(new LoadMoreButtonView(), this.boardComponent.getElement());
  };
}
