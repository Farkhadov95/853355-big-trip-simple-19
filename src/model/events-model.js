import { getRandomPoint } from '../mock/events.js';

const EVENTS_COUNT = 3;

export default class EventsModel {
  events = Array.from({length: EVENTS_COUNT}, getRandomPoint);

  getEvents() {
    return this.events;
  }
}

