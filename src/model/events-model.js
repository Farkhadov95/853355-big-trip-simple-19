import Observable from '../framework/observable.js';
import { getOffersByType } from '../utils/utils.js';
import { UpdateType } from '../const.js';

export default class EventsModel extends Observable {
  #eventsApiService = null;

  #allOffers = [];
  #allDestinations = [];
  #events = [];

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get events() {
    return this.#events;
  }

  async init() {
    try {
      await Promise.all([
        this.#eventsApiService.events,
        this.#eventsApiService.offers,
        this.#eventsApiService.destinations
      ]).then((results) => {
        const [events, offers, destinations] = results;
        this.#allOffers = offers;
        this.#allDestinations = destinations;
        this.#events = events.map(this.#adaptToClient);
        // console.log(1);
      });
    } catch(err) {
      this.#events = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updateEvent(updateType, update) {
    // console.log(this.#events);
    const index = this.#events.findIndex((event) => event.id === update.id);
    // console.log(index);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#eventsApiService.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType, updatedEvent);
    } catch(err) {
      throw new Error('Can\'t update event');
    }

  }

  async addEvent(updateType, update) {
    try {
      const response = await this.#eventsApiService.addEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch(err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  }

  #adaptToClient = (event) => {
    // console.log(event);
    const adaptedEvent = {...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'],
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'],
      offers: event.offers.map((id) => {
        const offersMatching = getOffersByType(event, this.#allOffers).find(
          (offer) => offer.id === id,
        );
        return offersMatching;
      }),
      destination: this.#allDestinations.find((destination) => destination.id === event.destination)

    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];

    return adaptedEvent;
  };
}

