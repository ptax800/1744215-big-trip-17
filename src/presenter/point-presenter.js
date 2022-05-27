import EventSortView from '../view/event-sort-view';
import EventListView from '../view/event-list-view';
import EventItemView from '../view/event-item-view';
import EventFormView from '../view/event-form-view';

import {render, RenderPosition} from '../render';

const ESCAPE_KEYS = ['Escape', 'Esc'];

// if (evt.key === 'Escape' || evt.key === 'Esc') {
// const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const isEscEvent = (evt) => ESCAPE_KEYS.includes(evt.key);

export default class PointPresenter {
  #pointModel = null;

  #containerElement = null;
  #eventListView = new EventListView();

  constructor(pointModel) {
    this.#pointModel = pointModel;
  }

  init = (containerElement) => {
    this.#containerElement = containerElement;

    const points = [...this.#pointModel.points];

    points.forEach((point) => {
      const eventItemView = new EventItemView(point);
      const eventFormView = new EventFormView(point);

      const replaceItemToForm = () => {
        // Element.replaceWith
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceWith
        eventItemView.element.replaceWith(eventFormView.element);
        document.removeEventListener('keydown', onEscKeyDown);
      };

      const replaceFormToItem = () => {
        eventFormView.element.replaceWith(eventItemView.element);
      };

      // function onEscKeyDown() {}
      const onEscKeyDown = (evt) => {
        if (isEscEvent(evt)) {
          evt.preventDefault();
          replaceFormToItem();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      // module 3: taskComponent.element.querySelector('.card__btn--edit').addEventListener('click', () => {
      //   https://github.com/htmlacademy-ecmascript/taskmanager-17/blob/module-3/src/presenter/board-presenter.js
      
      // module 4: taskComponent.setEditClickHandler(() => {
      //   https://github.com/htmlacademy-ecmascript/taskmanager-17/blob/module-4/src/presenter/board-presenter.js
  
      // module 4: eventItemView.setRollupButtonClickHandler(handleRollupButtonClick)
      eventItemView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
        // this.#eventListView.element.replaceChild(eventFormView.element, eventItemView.element);
        replaceItemToForm();
        document.addEventListener('keydown', onEscKeyDown);
      });

      // eventFormView.setRollupButtonClickHandler(() => {})
      eventFormView.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
        replaceItemToForm();
        document.removeEventListener('keydown', onEscKeyDown);
      });

      eventFormView.element.addEventListener('submit', (evt) => {
        evt.preventDefault();
        replaceItemToForm();
        document.removeEventListener('keydown', onEscKeyDown);
      });

      render(eventItemView, this.#eventListView.element);
    });

    render(new EventSortView(), this.#containerElement);
    render(this.#eventListView, this.#containerElement);
  };
}