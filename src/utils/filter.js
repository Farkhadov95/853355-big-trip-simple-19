import {FilterType} from '../const.js';
import { isEventStarted } from './utils.js';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventStarted(event.dateFrom))
};

export {filter};
