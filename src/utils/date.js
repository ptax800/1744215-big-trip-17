import dayjs from 'dayjs';
import pluginDuration from 'dayjs/plugin/duration';

dayjs.extend(pluginDuration);

const getDuration = (date1, date2, start = 'second') =>
  dayjs.duration(dayjs(date1).startOf(start).diff(dayjs(date2).startOf(start)));

const formatDuration = (duration) => {
  if (duration.days() > 0) {
    return duration.format('DD[D] HH[H] mm[M]');
  }
  if (duration.hours() > 0) {
    return duration.format('HH[H] mm[M]');
  }

  return duration.format('mm[M]');
};

const formatEventDuration = (dateFrom, dateTo) =>
  formatDuration(getDuration(dateTo, dateFrom, 'minute'));

const formatEventDate = (date) => date ? dayjs(date).format('MMM DD') : '';
const formatScheduleDate = (date) => date ? dayjs(date).format('HH:mm') : '';

export {
  formatEventDate,
  formatScheduleDate,
  formatEventDuration,
};
