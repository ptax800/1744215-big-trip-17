import { createPoints } from '../mock/point.js';

export default class PointModel {
  #points = createPoints();

  get points() {
    return this.#points;
  }
}
