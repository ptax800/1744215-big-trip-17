import AbstractView from '../framework/view/abstract-view';

const createViewTemplate = () => (
  '<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>'
);

class NewEventButtonView extends AbstractView {
  get template() {
    return createViewTemplate();
  }

  setDisabled = (value) => {
    this.element.disabled = value;
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#onClick);
  };

  #onClick = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}

export default NewEventButtonView;
