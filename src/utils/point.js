import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration)


const formatEventDate = (date) => dayjs(date).format('MMM DD');

const formatScheduleDate = (date) => dayjs(date).format('HH:mm');


const formatEventDuration = (milliseconds) => {
  const durationTime = dayjs.duration(milliseconds);


  if (durationTime.days() > 0) {
    return durationTime.format('DD[D] HH[H] mm[M]');;
  }
  if (durationTime.hours() > 0) {
    return durationTime.format('HH[H] mm[M]');;
  }

  return durationTime.format('mm[M]');
};

export {
  formatEventDate,
  formatScheduleDate,
  formatEventDuration,
};