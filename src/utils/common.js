const ESCAPE_KEYS = ['Escape', 'Esc'];

const isEscEvent = (evt) => ESCAPE_KEYS.includes(evt.key);

const updateItemById = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items.slice();
  }

  /*
  const newItems = items.slice();
  newItems.splice(index, 1, update);
  **/

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {
  isEscEvent,
  updateItemById,
};