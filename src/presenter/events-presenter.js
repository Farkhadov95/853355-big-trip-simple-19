import ListItemView from '../view/list-item-view.js';
import EditEventView from '../view/edit-event-view.js';
import {render} from '../render.js';
import { mockOffers } from '../mock/events.js';
import EventsListView from '../view/events-list-view.js';


export default class EventsPresenter {
  #eventListComponent = new EventsListView();

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

    render(this.#eventListComponent, this.eventsListContainer);

    for (const event of this.events) {
      this.#renderListItem((
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
      ), this.#eventListComponent.element);
    }
  }

  #renderListItem(point) {
    const listItemComponent = new ListItemView(point);
    const editComponent = new EditEventView(point);

    const replaceEventToEdit = () => {
      this.#eventListComponent.getElement().replaceChild(editComponent.getElement(), listItemComponent.getElement());
    };

    const replaceEditToEvent = () => {
      this.#eventListComponent.getElement().replaceChild(listItemComponent.getElement(), editComponent.getElement());
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    listItemComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEventToEdit();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    editComponent.getElement().addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    editComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(listItemComponent, this.#eventListComponent.element);
  }
}
