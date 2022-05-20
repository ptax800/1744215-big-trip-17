import { createOffer } from './offers.js'
import { createDestination } from './destinations.js'

/* Point
{
  "base_price": 1100,
  "date_from": "2019-07-10T22:55:56.845Z",
  "date_to": "2019-07-11T11:22:13.375Z",
  "destination": $Destination$,
  "id": "0",
  "is_favorite": false,
  "offers": $Array<Offer>$,
  "type": "bus"
}
**/
const createPoint = ({
  type = 'bus',
  dateFrom = new Date('2019-07-10T22:55:56.845Z'),
  dateTo = new Date('2019-07-11T11:22:13.375Z'),
  isFavorite = false,
  basePrice = 100,
  offers = [],
}) => ({
  id: '0',
  type,
  basePrice,
  dateFrom,
  dateTo,
  isFavorite,
  destination: createDestination(),
  offers,
});

const createPoints = [
  createPoint({
    dateFrom: new Date('2022-05-13T01:00:00.845Z'),
    dateTo: new Date('2022-05-14T01:00:00.845Z'),
    isFavorite: true,
    offers: [
      createOffer({ id: 1 }),
      createOffer({ id: 2 })
    ]
  }),
  createPoint({
    type: 'train',
    dateFrom: new Date('2022-05-14T01:00:00.845Z'),
    dateTo: new Date('2022-05-14T05:00:00.845Z'),
    offers: Array.from({ length: 4}, createOffer),
  }),
  createPoint({
    trype: 'ship',
    dateFrom: new Date('2022-05-14T05:00:00.845Z'),
    dateTo: new Date('2022-05-15T14:00:00.845Z'),
    isFavorite: true,
    offers: Array.from({ length: 1 }, createOffer),
  }),
];

export {
  createPoint,
  createPoints,
};

/* логика создания массива offers для рендеринга с `checked`
const offers = [];

typeOffers.forEach((offer) => {
  offers.push({
    ...offer,
    checked: point.offers.some(({ id }) => offer.id === offer),
  })
})
**/


/*
const offerTypeEnToRu = {
  bus: 'Автобус',
};

offerTypeEnToRu['bus'] //

const offerRuMap = new Map()
offerRuMap.set('bus', 'Автобус');

const createPoints = [
  createPoint({ type: 'bus', })
];
**/
