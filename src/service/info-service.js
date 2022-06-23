import { sortPointsByDay } from '@util/sort';

class InfoService {
  #pointService = null;

  constructor(pointService) {
    this.#pointService = pointService;
  }

  getDestinationNames = (points) => {
    const names = [...points]
      .sort(sortPointsByDay)
      .map(({ destination }) => destination.name);

    return names;
  };

  getTripDates = (points) => {
    const sortedPoints = [...points].sort(sortPointsByDay);

    return {
      dateStart: sortedPoints.at(0).dateFrom,
      dateEnd: sortedPoints.at(-1).dateTo,
    };
  };

  getTotalCost = (points) => {
    const pointService = this.#pointService;

    const reduceOffersCost = (offersCost, { price }) => offersCost + price;
    const reducePointsCost = (totalCost, { type, basePrice, offers }) =>
      offers.length > 0
        ? pointService.getOffersByIds(type, offers).reduce(reduceOffersCost, totalCost + basePrice)
        : totalCost + basePrice;

    return points.reduce(reducePointsCost, 0);
  };
}

export default InfoService;
