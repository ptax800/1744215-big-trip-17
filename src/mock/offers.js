
/* $Offer$ (real)
 {
    "id": 1,
    "title": "Upgrade to a business class",
    "price": 120
  }
**/
const createOffer = ({ id = 1, price = 1 } = {}) => ({
  id,
  title: 'Upgrade to a business class',
  price,
});

/* $Offer$
{
  "type": "taxi",
  "offers": [
    {
      "id": 1,
      "title": "Upgrade to a business class",
      "price": 120
    }, {
      "id": 2,
      "title": "Choose the radio station",
      "price": 60
    }
  ]
}
**/
const createOffers = [
  {
    type: 'bus',
    offers: [
      createOffer({ id: 1, price: 100 }),
      createOffer({ id: 2, price: 200 }),
      createOffer({ id: 3, price: 300 }),
    ]
  },
];

export {
  createOffer,
  createOffers,
};
