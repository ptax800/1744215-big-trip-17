import EventTripMainView from '../view/event-trip-main-view.js';
import EvenButtonView from '../view/event-button-view.js';
import EventFiltresView from '../view/event-filtres-view.js';
import {render} from '../render';


export default class HeaderPresenter {
  #containerElement = null;

  init = (containerElement) => {
    this.#containerElement = containerElement;

    render(new EventTripMainView(), this.#containerElement);
    render(new EventFiltresView(), this.#containerElement);
    render(new EvenButtonView(), this.#containerElement);

  };
}
