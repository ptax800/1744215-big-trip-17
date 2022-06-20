const sortPointsByDay = (a, b) => a.dateFrom - b.dateFrom;
const sortPointsByTime = (a, b) => (b.dateTo - b.dateFrom) - (a.dateTo - a.dateFrom);
const sortPointsByPrice = (a, b) => b.basePrice - a.basePrice;

export {
  sortPointsByTime,
  sortPointsByPrice,
  sortPointsByDay,
};
