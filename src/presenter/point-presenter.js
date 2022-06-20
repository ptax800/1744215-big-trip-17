import EventItemView from '../view/event-item-view';
import EventFormView from '../view/event-form-view';

import { render, replace, remove } from '../framework/render';
import { UserAction, UpdateType } from '../const.js';
import { isEscEvent } from '../utils/common';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class PointPresenter {
  #container = null;
  #changeAction = null;
  #pointService = null;

  #eventItemView = null;
  #eventFormView = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(container, changeAction, pointService) {
    this.#container = container;
    this.#changeAction = changeAction;
    this.#pointService = pointService;
  }

  init = (point) => {
    this.#point = point;

    const prevEventItemView = this.#eventItemView;
    const prevEventFormView = this.#eventFormView;

    const selectedOffers = this.#pointService.getOffersByIds(point.type, point.offers);

    this.#eventItemView = new EventItemView(point, selectedOffers);
    this.#eventFormView = new EventFormView(point, this.#pointService);

    this.#eventItemView.setRollupButtonClickHandler(this.#handlEventItemRollupButtonClick);
    this.#eventItemView.setFavoriteButtonClickHandler(this.#handleFavoriteButtonClick);
    this.#eventFormView.setRollupButtonClickHandler(this.#handlEventFormRollupButtonClick);
    this.#eventFormView.setSaveButtonClickHandler(this.#handleEventFormSaveButtonClick);
    this.#eventFormView.setDeleteButtonClickHandler(this.#handleEventFormDeleteButtonClick);

    if (prevEventItemView === null || prevEventFormView === null) {
      render(this.#eventItemView, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventItemView, prevEventItemView);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventFormView, prevEventFormView);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventItemView);
    remove(prevEventFormView);
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#eventFormView.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#eventFormView.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventItemView.shake();
      return;
    }

    const resetFormState = () => {
      this.#eventFormView.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventFormView.shake(resetFormState);
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
    this.#changeAction(
      UserAction.CHANGE_VIEW,
      UpdateType.PATCH,
      null,
    );

    replace(this.#eventFormView, this.#eventItemView);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.EDITING;
  };

  #replaceFormToItem = () => {
    this.#eventFormView.reset(this.#point);

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

  #handleEventFormSaveButtonClick = (point) => {
    this.#changeAction(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFavoriteButtonClick = () => {
    this.#changeAction(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite },
    );
  };

  #handleEventFormDeleteButtonClick = (point) => {
    this.#changeAction(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #onEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.#replaceFormToItem();
    }
  };
}

export default PointPresenter;
