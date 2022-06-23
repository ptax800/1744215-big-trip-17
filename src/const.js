const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
  CHANGE_VIEW: 'CHANGE_VIEW',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  INIT: 'INIT',
};

const TripMessage = {
  LOADING: 'Loading...',
};

const UiBlockerTimeLimit  = {
  LOWER: 350,
  UPPER: 1000,
};

export {
  POINT_TYPES,
  FilterType,
  SortType,
  UserAction,
  UpdateType,
  TripMessage,
  UiBlockerTimeLimit,
};
