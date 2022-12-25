import AddPointView from '../view/add-point-view.js';
import ListItemView from '../view/list-item-view.js';
import {render} from '../render.js';
import { mockOffers } from '../mock/events.js';

export default class EventsPresenter {

  constructor({eventsListContainer, eventsModel}) {
    this.eventsListContainer = eventsListContainer;
    this.eventsModel = eventsModel;
  }

  getOffersByType(point) {
    const pointType = mockOffers.find((offer) => offer.type === point.type);
    return pointType.offers;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];
    const eventsListContainer = document.querySelector('.trip-events');
    const eventsList = document.createElement('ul');
    eventsList.classList.add('trip-events__list');
    eventsListContainer.appendChild(eventsList);

    render(new AddPointView(), eventsList);

    for (let i = 0; i < this.events.length; i++) {
      render(new ListItemView(
        {
          ...this.events[i],
          offers : this.events[i].offers.map((id) => {
            const offer = this.getOffersByType(this.events[i]).find(
              (mockOffer) => mockOffer.id === id,
            );
            return offer || {};
          })
        }
      ), eventsList);
    }
  }
}
