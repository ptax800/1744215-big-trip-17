import EventSortView from '../view/event-sort-view';
import EventListView from '../view/event-list-view';
import EventItemView from '../view/event-item-view';
import EventFormView from '../view/event-form-view';

import {render, RenderPosition} from '../render';

const ESCAPE_KEYS = ['Escape', 'Esc'];

const isEscEvent = (evt) => ESCAPE_KEYS.includes(evt.key);

export default class PointPresenter {
  #pointModel = null;

  #containerElement = null;
  #eventListView = new EventListView();

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

    render(new EventSortView(), this.#containerElement);
    render(this.#eventListView, this.#containerElement);
  }

  #renderPoint = (point) => {
    const eventItemView = new EventItemView(point);
    const eventFormView = new EventFormView(point);

    const replaceItemToForm = () => {
      eventItemView.element.replaceWith(eventFormView.element);
      document.removeEventListener('keydown', onEscKeyDown);
    };

    const replaceFormToItem = () => {
      eventFormView.element.replaceWith(eventItemView.element);
    };

    const onEscKeyDown = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        replaceFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const handleEventItemRollupButtonClick = () => {
      replaceItemToForm();
      document.addEventListener('keydown', onEscKeyDown);
    };

    eventItemView.setRollupButtonClickHandler(handleEventItemRollupButtonClick);

    eventFormView.setRollupButtonClickHandler(() => {
      replaceItemToForm();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventFormView.setSaveButtonHandler(() => {
      replaceItemToForm();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(eventItemView, this.#eventListView.element);
  }
}
