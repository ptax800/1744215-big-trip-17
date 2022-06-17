import EventItemView from '../view/event-item-view';
import EventFormView from '../view/event-form-view';

import { render, replace, remove } from '../framework/render';
import { isEscEvent } from '../utils/common';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class PointPresenter {
  #container = null;
  #changeData = null;
  #changeMode = null;

  #eventItemView = null;
  #eventFormView = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(container, changeData, changeMode) {
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, destinations) => {
    this.#point = point;

    const prevEventItemView = this.#eventItemView;
    const prevEventFormView = this.#eventFormView;

    this.#eventItemView = new EventItemView(point);
    this.#eventFormView = new EventFormView(point, destinations);

    this.#eventItemView.setRollupButtonClickHandler(this.#handlEventItemRollupButtonClick);
    this.#eventItemView.setFavoriteButtonClickHandler(this.#handleFavoriteButtonClick);
    this.#eventFormView.setRollupButtonClickHandler(this.#handlEventFormRollupButtonClick);
    this.#eventFormView.setSaveButtonClickHandler(this.#handleEventFormSaveButtonClick);

    if (prevEventItemView === null || prevEventFormView === null) {
      // render(this.#eventItemView, this.#container);
      render(this.#eventFormView, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventItemView, prevEventItemView);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventFormView, prevEventFormView);
    }

    remove(prevEventItemView);
    remove(prevEventFormView);
  };

  destroy = () => {
    remove(this.#eventItemView);
    remove(this.#eventFormView);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToItem();
    }
  };

  #replaceItemToForm = () => {
    this.#changeMode();

    replace(this.#eventFormView, this.#eventItemView);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.EDITING;
  };

  #replaceFormToItem = () => {
    replace(this.#eventItemView, this.#eventFormView);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #handlEventItemRollupButtonClick = () => {
    this.#replaceItemToForm();
  };

  #handlEventFormRollupButtonClick = () => {
    this.#replaceFormToItem();
  };

  #handleEventFormSaveButtonClick = () => {
    this.#replaceFormToItem();
  };

  #handleFavoriteButtonClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #onEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.#replaceFormToItem();
    }
  };
}

export default PointPresenter;
