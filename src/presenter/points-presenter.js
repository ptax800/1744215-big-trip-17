import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import EventSortView from '../view/event-sort-view';
import EventListView from '../view/event-list-view';
import TripMessageView from '../view/trip-message-view';
import PointPresenter from './point-presenter';
import PointNewPresenter from './point-new-presenter';

import PointService from '../service/point-service';

import { render, remove, RenderPosition } from '../framework/render';
import { sortPointsByTime, sortPointsByPrice } from '../utils/sort';
import { SortType, UserAction, UpdateType, TripMessage } from '../const';

const TimeLimit = {
  LOWER: 350,
  UPPER: 1000,
};

class PointsPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #containerElement = null;
  #eventListView = new EventListView();
  #eventSortView = null;
  #tripMessageView = null;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER, TimeLimit.UPPER);

  #pointNewPresenter = null;
  #pointService = null;
  #pointPresenter = new Map();

  #currentSortType = SortType.DAY;
  #isLoading = true;

  constructor(pointsModel, destinationsModel, offersModel) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointService = new PointService(offersModel, destinationsModel);

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = [...this.#pointsModel.points];

    switch (this.#currentSortType) {
      case SortType.TIME:
        return points.sort(sortPointsByTime);
      case SortType.PRICE:
        return points.sort(sortPointsByPrice);
    }

    return points;
  }

  init = (containerElement) => {
    this.#containerElement = containerElement;

    this.#renderList();
  };

  createPoint = (callback) => {
    if (this.#pointNewPresenter === null) {
      this.#pointNewPresenter = new PointNewPresenter(
        this.#eventListView.element,
        this.#handleViewAction,
        this.#pointService,
      );
    }

    this.#resetView();
    this.#currentSortType = SortType.DAY;
    this.#pointNewPresenter.init(callback);
  };

  #renderList = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    if (points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    points.forEach(this.#renderPoint);

    render(this.#eventListView, this.#containerElement);
  };

  #renderLoading = () => {
    this.#tripMessageView = new TripMessageView(TripMessage.LOADING);
    render(this.#tripMessageView, this.#containerElement, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoints = () => {
    this.#tripMessageView = new TripMessageView(TripMessage.NO_POINTS);
    render(this.#tripMessageView, this.#containerElement, RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    if (this.#eventSortView === null) {
      this.#eventSortView = new EventSortView();
    }

    render(this.#eventSortView, this.#containerElement, RenderPosition.AFTERBEGIN);

    this.#eventSortView.setChangeHandler(this.#handleSortTypeChange);
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

  #clearList = () => {
    this.#pointNewPresenter?.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #resetView = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
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
        this.#resetView();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#tripMessageView);
        this.#renderList();
        break;
    }
  };
}

export default PointsPresenter;
