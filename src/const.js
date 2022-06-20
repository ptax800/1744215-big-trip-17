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

/*
Значение отображаемого текста зависит от выбранного фильтра:
  * Everthing – 'Click New Event to create your first point'
  * Past — 'There are no past events now';
  * Future — 'There are no future events now'.
**/
const TripMessage = {
  LOADING: 'Loading...',
  NO_POINTS: 'Click New Event to create your first point',
};

export {
  POINT_TYPES,
  SortType,
  UserAction,
  UpdateType,
  TripMessage,
};
