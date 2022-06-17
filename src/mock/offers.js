

const createOffer = ({ id = 1, price = 1 } = {}) => ({
  id,
  title: 'Upgrade to a business class',
  price,
});


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
