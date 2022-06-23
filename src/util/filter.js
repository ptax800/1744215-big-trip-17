import { FilterType } from '@/const';

const filterTypeToPoints = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.PAST]: (points, dateNow) => points.filter(({ dateFrom }) => dateFrom < dateNow),
  [FilterType.FUTURE]: (points, dateNow) => points
    .filter(({ dateFrom, dateTo }) => dateFrom > dateNow || dateFrom < dateNow && dateTo > dateNow),
};

const filterPoints = (points, filterType = FilterType.EVERYTHING) =>
  filterTypeToPoints[filterType](points, Date.now());

export { filterPoints };
