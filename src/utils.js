import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY HH:MM';


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeEventDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

export {getRandomArrayElement, humanizeEventDueDate};
