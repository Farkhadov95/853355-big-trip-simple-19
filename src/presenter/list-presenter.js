import {render, RenderPosition} from '../framework/render.js';
import { getMockOffersByType, updateItem } from '../utils.js';
import EmptyListView from '../view/list-empty-view.js';
import EventPresenter from './event-presenter.js';
import ListSortView from '../view/list-sort-view.js';
import { SortType } from '../const.js';
import { sortEventsByDay, sortEventsByPrice } from '../utils.js';

export default class ListPresenter {
  #eventListComponent = null;
  #emptyList = new EmptyListView();

  #listSortComponent = null;
  #eventsListContainer = null;
  #eventsModel = null;
  #events = [];
  #eventsPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedListEvents = [];

  constructor({eventsListContainer, eventsModel, eventListComponent}) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;
    this.#eventListComponent = eventListComponent;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#sourcedListEvents = [...this.#eventsModel.events];

    this.#renderSortList();
    render(this.#eventListComponent, this.#eventsListContainer);

    if (this.#events.length === 0) {
      render(this.#emptyList, this.#eventListComponent.element);
      return;
    }

    this.#renderAllEvents();
  }

  #renderAllEvents() {
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortEvents(sortType);
    this.#clearList();
    this.#renderAllEvents();
  };

  #renderSortList() {
    this.#listSortComponent = new ListSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#listSortComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
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
    this.#sourcedListEvents = updateItem(this.#sourcedListEvents , updatedEvent);
    this.#eventsPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#events.sort(sortEventsByDay);
        break;
      case SortType.PRICE:
        this.#events.sort(sortEventsByPrice);
        break;
      default:

        this.#events = [...this.#sourcedListEvents];
    }

    this.#currentSortType = sortType;
  }

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
