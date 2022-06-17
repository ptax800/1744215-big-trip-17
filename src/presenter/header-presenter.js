import EventTripMainView from '../view/event-trip-main-view';
import EvenButtonView from '../view/event-button-view';
import EventFiltresView from '../view/event-filtres-view';

import { render } from '../framework/render';

class HeaderPresenter {
  #containerElement = null;

  init = (containerElement) => {
    this.#containerElement = containerElement;

    render(new EventTripMainView(), this.#containerElement);
    render(new EventFiltresView(), this.#containerElement);
    render(new EvenButtonView(), this.#containerElement);
  };
}

export default HeaderPresenter;
