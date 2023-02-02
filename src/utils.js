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

function sortEventsByDay(eventA, eventB) {
  const weight = getWeightForNull(eventA.dateFrom, eventB.dateFrom);
  return weight ?? dayjs(eventB.dateFrom).diff(dayjs(eventA.dateFrom));
}

function sortEventsByPrice(eventA, eventB) {
  const weight = getWeightForNull(eventA.price, eventB.price);
  return weight ?? (eventB.basePrice - eventA.basePrice);
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function isEventExpired(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}


export {getRandomArrayElement, humanizeEventDueDate,
  getMockOffersByType, sortEventsByDay, sortEventsByPrice,
  isDatesEqual, isEventExpired
};
