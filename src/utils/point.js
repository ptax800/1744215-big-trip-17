import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

// https://day.js.org/docs/ru/display/format
const formatEventDate = (date) => dayjs(date).format('MMM DD');
const formatScheduleDate = (date) => dayjs(date).format('HH:mm');

/*
Формат продолжительности нахождения в точке маршрута зависит от длительности:

Менее часа: минуты (например, 23M);
Менее суток: часы минуты (например, 02H 44M или 12H 00M, если минуты равны нулю);
Более суток: дни часы минуты (например, 01D 02H 30M или 07D 00H 00M, если часы и/или минуты равны нулю).
**/
const formatEventDuration = (milliseconds) => {
  const durationTime = dayjs.duration(milliseconds);

  if (durationTime.days() > 0) {
    return durationTime.format('DD[D] HH[H] mm[M]');
  }
  if (durationTime.hours() > 0) {
    return durationTime.format('HH[H] mm[M]');
  }

  return durationTime.format('mm[M]');
};

const sortPointsByTime = (a, b) => (b.dateTo - b.dateFrom) - (a.dateTo - a.dateFrom);
const sortPointsByPrice = (a, b) => b.basePrice - a.basePrice;

export {
  formatEventDate,
  formatScheduleDate,
  formatEventDuration,
  sortPointsByTime,
  sortPointsByPrice,
};
