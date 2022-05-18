import { createPoints } from '../mock/point.js';

export default class PointModel {
  points = createPoints;

  getPoints = () => this.points;
}
