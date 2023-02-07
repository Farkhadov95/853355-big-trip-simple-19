import {render, remove, RenderPosition} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import EmptyListView from '../view/list-empty-view.js';
import EventPresenter from './event-presenter.js';
import ListSortView from '../view/list-sort-view.js';
import LoadingView from '../view/list-loading-view.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortEventsByDay, sortEventsByPrice } from '../utils/utils.js';
import NewEventPresenter from './new-event-presenter.js';
import { filter } from '../utils/filter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class ListPresenter {
  #eventListComponent = null;
  #listSortComponent = null;
  #eventsListContainer = null;
  #loadingComponent = new LoadingView();
  #eventsModel = null;
  #filterModel = null;
  #eventsPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #emptyListMessage = null;
  #newEventPresenter = null;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({eventsListContainer, eventsModel, filterModel, eventListComponent, onNewEventDestroy}) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#eventListComponent = eventListComponent;

    this.#newEventPresenter = new NewEventPresenter({
      eventsListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      onDestroy: onNewEventDestroy
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredEvents.sort(sortEventsByDay);
      case SortType.PRICE:
        return filteredEvents.sort(sortEventsByPrice);
    }
    return filteredEvents;
  }

  init() {
    this.#renderList();
  }

  createEvent() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init(this.#eventsModel.allDestinations);
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsPresenters.get(update.state.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update.state);
        } catch(err) {
          this.#eventsPresenters.get(update.state.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsPresenters.get(update.state.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update.state);
        } catch(err) {
          this.#eventsPresenters.get(update.state.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({resetSortType: true});
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
      onModeChange: this.#handleModeChange,
      destinationsList: this.#eventsModel.allDestinations
    });
    eventPresenter.init(event);
    this.#eventsPresenters.set(event.id, eventPresenter);
  }


  #renderAllEvents(allEvents = this.events) {
    allEvents.forEach((event) => this.#renderListItem(event));
  }

  #renderEmptyListMessage() {
    this.#emptyListMessage = new EmptyListView();
    render(this.#emptyListMessage, this.#eventListComponent.element);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
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

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const events = this.events;
    const eventsCount = events.length;

    if ((eventsCount === 0)) {
      this.#renderEmptyListMessage();
      return;
    }

    render(this.#eventListComponent, this.#eventsListContainer);
    this.#renderSortList();
    this.#renderAllEvents(this.events);
  }

}
