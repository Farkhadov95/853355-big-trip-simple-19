import dayjs from 'dayjs';
// import { mockOffers } from '../mock/events';

const DATE_FORMAT = 'DD/MM/YY HH:mm';

const DATE_FORMAT_LIST = 'MMM-D';


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeEventDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function humanizeDateForList(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_LIST) : '';
}

function getOffersByType(point, allOffers) {
  const offerType = allOffers.find((offer) => offer.type === point.type).offers;
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
  return weight ?? dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

function sortEventsByPrice(eventA, eventB) {
  const weight = getWeightForNull(eventA.price, eventB.price);
  return weight ?? (eventB.basePrice - eventA.basePrice);
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function isEventStarted(dateFrom) {
  return dateFrom && dayjs().isBefore(dateFrom, 'D');
}


export {getRandomArrayElement, humanizeEventDueDate,
  getOffersByType, sortEventsByDay, sortEventsByPrice,
  isDatesEqual, isEventStarted, humanizeDateForList
};
