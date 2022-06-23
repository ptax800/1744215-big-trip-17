import AbstractView from '../framework/view/abstract-view';

import { FilterType } from '../const';

const createFilterTemplate = (id, text, isChecked = false) => (
  `<div class="trip-filters__filter">
    <input 
      id="filter-${id}" 
      class="trip-filters__filter-input visually-hidden" 
      type="radio" 
      name="trip-filter" 
      value="${id}"
      ${isChecked ? 'checked': ''}
    >
    <label class="trip-filters__filter-label" for="filter-${id}">${text}</label>
  </div>`
);

const createViewTemplate = () => (
  `<div class="trip-main__trip-controls  trip-controls">
    <div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${createFilterTemplate(FilterType.EVERYTHING, 'Everything', true)}
      ${createFilterTemplate(FilterType.PAST, 'Past')}
      ${createFilterTemplate(FilterType.FUTURE, 'Future')}

      <button class="visually-hidden" type="submit">Accept filter</button>  
    </form>
    </div>
  </div>`
);

class FiltresView extends AbstractView {
  get template() {
    return createViewTemplate();
  }

  setFilter = (filterType) => {
    this.element.querySelector(`input[value=${filterType}]`).checked = true;
  };

  setTypeChangeHandler = (callback) => {
    this._callback.change = callback;
    this.element.addEventListener('change', this.#changeHandler);
  };

  updateElement = (state) => {
    const element = this.element;

    Object.entries(state).forEach(([filterType, isEnabled]) => {
      element.querySelector(`input[id=filter-${filterType}`).disabled = ! isEnabled;
    });
  };

  #changeHandler = (evt) => {
    this._callback.change(evt.target.value);
  };
}

export default FiltresView;
