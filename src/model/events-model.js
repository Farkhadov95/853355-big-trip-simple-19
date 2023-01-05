import { getRandomPoint } from '../mock/events.js';

const EVENTS_COUNT = 3;

export default class EventsModel {
  eventsArray = Array.from({length: EVENTS_COUNT}, getRandomPoint);

  get events() {
    return this.eventsArray;
  }
}

