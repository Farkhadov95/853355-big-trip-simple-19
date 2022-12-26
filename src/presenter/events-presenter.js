import AddPointView from '../view/add-point-view.js';
import ListItemView from '../view/list-item-view.js';
import {render} from '../render.js';
import { mockOffers } from '../mock/events.js';
import EventsListView from '../view/events-list-view.js';
export default class EventsPresenter {

  constructor({eventsListContainer, eventsModel}) {
    this.eventsListContainer = eventsListContainer;
    this.eventsModel = eventsModel;
  }

  getOffersByType(point) {
    const offerType = mockOffers.find((offer) => offer.type === point.type);
    return offerType.offers;
  }

  getOffersByID(event, id) {
    this.getOffersByType(event).find(
      (mockOffer) => mockOffer.id === id,
    );
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];
    const eventsListContainer = document.querySelector('.trip-events');
    const eventList = new EventsListView();

    render(eventList, eventsListContainer);
    render(new AddPointView(), eventList.element);

    for (const event of this.events) {
      render(new ListItemView(
        {
          ...event,
          offers: event.offers.map((id) => {
            const offer = this.getOffersByType(event).find(
              (mockOffer) => mockOffer.id === id,
            );
            return offer || {};
          }
          )
        }
      ), eventList.element);
    }

  }
}
