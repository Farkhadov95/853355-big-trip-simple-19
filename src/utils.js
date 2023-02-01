import dayjs from 'dayjs';
import { mockOffers } from './mock/events';

const DATE_FORMAT = 'DD/MM/YY HH:MM';


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeEventDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function getMockOffersByType(point) {
  const offerType = mockOffers.find((offer) => offer.type === point.type).offers;
  return offerType;
}

function getWeightForNull(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortEventsByDay(taskA, taskB) {
  const weight = getWeightForNull(taskA.dateFrom, taskB.dateFrom);
  return weight ?? dayjs(taskB.dateFrom).diff(dayjs(taskA.dateFrom));
}

function sortEventsByPrice(taskA, taskB) {
  const weight = getWeightForNull(taskA.price, taskB.price);
  return weight ?? (taskB.basePrice - taskA.basePrice);
}


export {getRandomArrayElement, humanizeEventDueDate, getMockOffersByType, sortEventsByDay, sortEventsByPrice};
