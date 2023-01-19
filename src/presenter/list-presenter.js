import { render } from '../render.js';
import EventsListView from '../view/events-list-view.js';
import { getMockOffersByType, updateItem } from '../utils.js';
import EmptyListView from '../view/list-empty-view.js';
import EventPresenter from './event-presenter.js';

export default class ListPresenter {
  #eventListComponent = new EventsListView();
  #emptyList = new EmptyListView();

  #eventsListContainer = null;
  #eventsModel = null;
  #events = [];
  #eventsPresenters = new Map();

  constructor({eventsListContainer, eventsModel}) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];

    render(this.#eventListComponent, this.#eventsListContainer);

    if (this.#events.length === 0) {
      render(this.#emptyList, this.#eventListComponent.element);
      return;
    }

    for (const event of this.#events) {
      const eventWithSelectedOffers = {
        ...event,
        offers: event.offers.map((id) => {
          const offer = getMockOffersByType(event).find(
            (mockOffer) => mockOffer.id === id,
          );
          return offer;
        }),
      };

      this.#renderListItem(eventWithSelectedOffers);
    }
  }

  #handleModeChange = () => {
    this.#eventsPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearList() {
    this.#eventsPresenters.forEach((presenter) => presenter.destroy());
    this.#eventsPresenters.clear();
  }

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventsPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #renderListItem(event) {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init(event);
    this.#eventsPresenters.set(event.id, eventPresenter);
  }
}
