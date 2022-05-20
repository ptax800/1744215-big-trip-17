/* $Destination$
{
  "description": "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
  "name": "Chamonix",
  "pictures": [
    {
      "src": "http://picsum.photos/300/200?r=0.0762563005163317",
      "description": "Chamonix parliament building"
    }
}
**/
const createDestination = ({
  name = 'Chamonix',
  description = 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
} = {}) => ({
  description,
  name,
  pictures: [
    {
      src: 'http://picsum.photos/300/200?r=0.0762563005163317',
      description: 'Chamonix parliament building',
    }
  ],
});

const createDestinations = [
  createDestination({ name: 'Moscow' }),
  createDestination({ name: 'Moon' }),
  createDestination({ name: 'Mars' }),
];

export {
  createDestination,
  createDestinations,
};
