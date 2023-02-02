import {render, remove, RenderPosition} from '../framework/render.js';
import EmptyListView from '../view/list-empty-view.js';
import EventPresenter from './event-presenter.js';
import ListSortView from '../view/list-sort-view.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { sortEventsByDay, sortEventsByPrice, getMockOffersByType } from '../utils.js';
import NewEventPresenter from './new-event-presenter.js';

export default class ListPresenter {
  #eventListComponent = null;

  #listSortComponent = null;
  #eventsListContainer = null;
  #eventsModel = null;
  #eventsPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #addEventButton = null;
  #emptyListMessage = new EmptyListView();
  #newEventPresenter = null;

  constructor({eventsListContainer, eventsModel, eventListComponent, onNewEventDestroy}) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;
    this.#eventListComponent = eventListComponent;

    this.#newEventPresenter = new NewEventPresenter({
      eventsListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      onDestroy: onNewEventDestroy
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#eventsModel.events].sort(sortEventsByDay);
      case SortType.PRICE:
        return [...this.#eventsModel.events].sort(sortEventsByPrice);
    }

    return this.#eventsModel.events;
  }

  init() {
    this.#renderList();
  }

  createEvent() {
    this.#currentSortType = SortType.DEFAULT;
    this.#newEventPresenter.init();
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderList();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearList();
        this.#renderList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();
  };

  #renderSortList() {
    this.#listSortComponent = new ListSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#listSortComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
  }

  #renderListItem(event) {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    eventPresenter.init(event);
    this.#eventsPresenters.set(event.id, eventPresenter);
  }

  #renderAllEvents() {
    for (const event of this.events) {

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

  #renderEmptyListMessage() {
    this.#emptyListMessage = new EmptyListView();
    render(this.#emptyListMessage, this.#eventListComponent.element);
  }

  #clearList({resetSortType = false} = {}) {
    this.#newEventPresenter.destroy();
    this.#eventsPresenters.forEach((presenter) => presenter.destroy());
    this.#eventsPresenters.clear();

    remove(this.#listSortComponent);

    if (this.#emptyListMessage) {
      remove(this.#emptyListMessage);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderList() {
    render(this.#eventListComponent, this.#eventsListContainer);

    const events = this.events;
    const eventsCount = events.length;

    if ((eventsCount === 0)) {
      this.#renderEmptyListMessage();
      return;
    }

    this.#renderSortList();
    this.#renderAllEvents();
  }

}
