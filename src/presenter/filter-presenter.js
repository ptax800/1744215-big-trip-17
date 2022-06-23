import { render } from '@framework/render';
import { UpdateType } from '@/const';

import FiltersView from '@view/filters-view';

class FilterPresenter {
  #containerElement = null;
  #pointsModel = null;
  #filterModel = null;

  #filtersView = null;

  constructor(containerElement, pointsModel, filterModel) {
    this.#containerElement = containerElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init = () => {
    if (this.#filtersView === null) {
      this.#filtersView = new FiltersView();
      this.#filtersView.setTypeChangeHandler(this.#handleFilterTypeChange);

      this.#pointsModel.addObserver(this.#handleModelEvent);
      this.#filterModel.addObserver(this.#handleModelEvent);
    }

    render(this.#filtersView, this.#containerElement);
  };

  #handleModelEvent = () => {
    this.#filtersView.setFilter(this.#filterModel.filter);

    const points = this.#pointsModel.points;

    if (points.length === 0) {
      this.#filtersView.updateElement({
        everything: false,
        past: false,
        future: false,
      });

      return;
    }

    const dateNow = Date.now();

    this.#filtersView.updateElement({
      everything: true,
      past: points.some(({ dateFrom }) => dateFrom < dateNow),
      future: points.some(({ dateFrom }) => dateFrom > dateNow),
    });
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

export default FilterPresenter;
