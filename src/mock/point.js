import { createOffer } from './offers.js';
import { createDestination } from './destinations.js';


const createPoint = ({
  type = 'bus',
  dateFrom = new Date('2019-07-10T22:55:56.845Z'),
  dateTo = new Date('2019-07-11T11:22:13.375Z'),
  isFavorite = false,
  basePrice = 100,
  offers = [],
}) => ({
  id: String(Math.random()).slice(15),
  type,
  basePrice,
  dateFrom,
  dateTo,
  isFavorite,
  destination: { // null
    name: 'Moon',
    description: 'xyz',
    pictures: [],
  },
  offers,
});

const createPoints = () => [
  createPoint({
    dateFrom: new Date('2022-05-13T01:12:00.845Z'),
    dateTo: new Date('2022-05-14T01:46:00.845Z'),
    isFavorite: true,
    offers: [
      createOffer({ id: 1 }),
      createOffer({ id: 2 })
    ],
    basePrice: 200,
  }),
  createPoint({
    type: 'train',
    dateFrom: new Date('2022-05-14T01:00:00.845Z'),
    dateTo: new Date('2022-05-14T05:00:00.845Z'),
    offers: Array.from({ length: 4}, createOffer),
    basePrice: 100,
  }),
  createPoint({
    trype: 'ship',
    dateFrom: new Date('2022-05-14T05:22:00.845Z'),
    dateTo: new Date('2022-05-15T14:00:00.845Z'),
    isFavorite: true,
    offers: Array.from({ length: 1 }, createOffer),
    basePrice: 500,
  }),
];

export {
  createPoint,
  createPoints,
};

