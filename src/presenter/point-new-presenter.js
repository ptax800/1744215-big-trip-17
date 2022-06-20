import { remove, render, RenderPosition } from '../framework/render.js';
import EventFormView from '../view/event-form-view';
import { UserAction, UpdateType } from '../const.js';

import { isEscEvent } from '../utils/common';

const createNewPoint = () => ({
  type: 'taxi',
  basePrice: 1,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  isFavorite: false,
  offers: [],
});

class PointNewPresenter {
  #containerElement = null;
  #changeAction = null;
  #pointService = null;

  #eventFormView = null;
  #destroyCallback = null;

  constructor(containerElement, changeAction, pointService) {
    this.#containerElement = containerElement;
    this.#changeAction = changeAction;
    this.#pointService = pointService;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#eventFormView !== null) {
      return;
    }

    this.#eventFormView = new EventFormView(createNewPoint(), this.#pointService);

    this.#eventFormView.setSaveButtonClickHandler(this.#handleSaveButtonClick);
    this.#eventFormView.setCancelButtonClickHandler(this.#handleCancelClick);

    render(this.#eventFormView, this.#containerElement, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  setSaving = () => {
    this.#eventFormView.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
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
    if (this.#eventFormView === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#eventFormView);
    this.#eventFormView = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleSaveButtonClick = (point) => {
    this.#changeAction(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #onEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}

export default PointNewPresenter;
