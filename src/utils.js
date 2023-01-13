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

export {getRandomArrayElement, humanizeEventDueDate, getMockOffersByType};
