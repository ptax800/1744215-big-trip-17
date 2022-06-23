import { render, remove, RenderPosition } from '@framework/render';
import UiBlocker from '@framework/ui-blocker/ui-blocker';

import EventSortView from '@view/event/event-sort-view';
import EventListView from '@view/event/event-list-view';
import TripMessageView from '@view/trip/trip-message-view';

import PointPresenter from './point-presenter';
import PointNewPresenter from './point-new-presenter';

import { filterPoints } from '@util/filter';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice } from '@util/sort';
import {
  FilterType,
  SortType,
  UserAction,
  UpdateType,
  TripMessage,
  UiBlockerTimeLimit as TimeLimit,
} from '@/const';

const filterTypeToMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

class PointsPresenter {
  #containerElement = null;
  #pointsModel = null;
  #filterModel = null;
  #pointService = null;

  #eventListView = new EventListView();
  #eventSortView = null;
  #tripMessageView = null;

  #pointPresenter = new Map();
  #pointNewPresenter = null;

  #currentSortType = SortType.DAY;

  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER, TimeLimit.UPPER);

  constructor(containerElement, pointsModel, filterModel, pointService) {
    this.#containerElement = containerElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointService = pointService;
  }

  get points() {
    const filteredPoints = filterPoints(
      this.#pointsModel.points,
      this.#filterModel.filter,
    );

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
    }

    return filteredPoints.sort(sortPointsByDay);
  }

  init = () => {
    this.#renderList();

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  };

  createPoint = (callback) => {
    if (this.#pointNewPresenter === null) {
      this.#pointNewPresenter = new PointNewPresenter(
        this.#eventListView.element,
        this.#handleViewAction,
        this.#pointService,
      );
    }

    this.#currentSortType = SortType.DAY;
    this.#eventSortView.setSort(SortType.DAY);
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #renderSort = () => {
    if (this.#eventSortView === null) {
      this.#eventSortView = new EventSortView();
      this.#eventSortView.setTypeChangeHandler(this.#handleSortTypeChange);
    }

    render(this.#eventSortView, this.#containerElement, RenderPosition.AFTERBEGIN);
  };

  #renderList = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    if (points.length === 0) {
      remove(this.#eventSortView);
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    points.forEach(this.#renderPoint);

    render(this.#eventListView, this.#containerElement);
  };

  #clearList = ({ resetSortType = false } = {}) => {
    if (this.#tripMessageView !== null) { // if (this.#tripMessageView) {...}
      remove(this.#tripMessageView);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
      this.#eventSortView.setSort(SortType.DAY);
    }

    this.#pointNewPresenter?.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPoint = (point) => {
    const presenter = new PointPresenter(
      this.#eventListView.element,
      this.#handleViewAction,
      this.#pointService,
    );

    presenter.init(point);

    this.#pointPresenter.set(point.id, presenter);
  };

  #renderMessage = (message) => {
    this.#tripMessageView = new TripMessageView(message);
    render(this.#tripMessageView, this.#containerElement, RenderPosition.AFTERBEGIN);
  };

  #renderLoading = () => {
    this.#renderMessage(TripMessage.LOADING);
  };

  #renderNoPoints = () => {
    this.#renderMessage(filterTypeToMessage[this.#filterModel.filter]);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.CHANGE_VIEW:
        this.#pointNewPresenter?.destroy();
        this.#pointPresenter.forEach((presenter) => presenter.resetView());
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({ resetSortType: true });
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#tripMessageView);
        this.#renderList();
        break;
    }
  };
}

export default PointsPresenter;
