import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

import { sortPointsByDay } from '../utils/sort';

class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];

  constructor(pointsApiService) {
    super();

    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points
        .map(PointsModel.adaptToClient)
        .sort(sortPointsByDay);
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  };

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = PointsModel.adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  };

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = PointsModel.adaptToClient(response);

      this.#points = [newPoint, ...this.#points];

      if (updateType === UpdateType.MINOR) {
        this.#points.sort(sortPointsByDay);
      }

      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  };

  static adaptToClient = ({
    'base_price': basePrice,
    'date_from': dateFrom,
    'date_to': dateTo,
    'is_favorite': isFavorite,
    ...point
  }) => ({
    ...point,
    basePrice,
    dateFrom: dateFrom !== null ? new Date(dateFrom) : null,
    dateTo: dateTo !== null ? new Date(dateTo) : null,
    isFavorite,
  });
}

export default PointsModel;
