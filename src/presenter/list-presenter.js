import {render, RenderPosition} from '../framework/render.js';
import EmptyListView from '../view/list-empty-view.js';
import EventPresenter from './event-presenter.js';
import ListSortView from '../view/list-sort-view.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { sortEventsByDay, sortEventsByPrice, getMockOffersByType } from '../utils.js';
import { getRandomPoint } from '../mock/events.js';

export default class ListPresenter {
  #eventListComponent = null;

  #listSortComponent = null;
  #eventsListContainer = null;
  #eventsModel = null;
  #initEvent = getRandomPoint();
  #eventsPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #addEventButton = null;
  #emptyListMessage = new EmptyListView();

  constructor({eventsListContainer, eventsModel, eventListComponent, addEventButton}) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;
    this.#eventListComponent = eventListComponent;
    this.#addEventButton = addEventButton;

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
    this.#renderSortList();
    this.#renderAddEvent(this.#initEvent);
    render(this.#eventListComponent, this.#eventsListContainer);

    if (this.events.length === 0) {
      render(this.#emptyListMessage, this.#eventListComponent.element);
    }
    this.#renderAllEvents();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_TASK:
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
        // this.#clearList();
        this.#renderList();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#clearEventsList();
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

  #clearEventsList() {
    this.#eventsPresenters.forEach((presenter) => presenter.destroy());
    this.#eventsPresenters.clear();
  }

  #renderListItem(event) {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      onAddButtonClick: this.#addEventButton,
      onEmptyList: this.#emplyListMessageHandler
    });
    eventPresenter.init(event);
    this.#eventsPresenters.set(event.id, eventPresenter);
  }

  #renderAddEvent(event) {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      onAddButtonClick: this.#addEventButton,
      onEmptyList: this.#emplyListMessageHandler
    });
    eventPresenter.initAddEvent(event);
    this.#eventsPresenters.set(event.id, eventPresenter);
  }

  // #clearList({resetSortType = false} = {}) {
  //   const taskCount = this.tasks.length;

  //   this.#newTaskPresenter.destroy();
  //   this.#taskPresenter.forEach((presenter) => presenter.destroy());
  //   this.#taskPresenter.clear();

  //   remove(this.#sortComponent);
  //   remove(this.#loadMoreButtonComponent);

  //   if (this.#noTaskComponent) {
  //     remove(this.#noTaskComponent);
  //   }

  //   this.#renderedTaskCount = Math.min(taskCount, this.#renderedTaskCount);

  //   if (resetSortType) {
  //     this.#currentSortType = SortType.DEFAULT;
  //   }
  // }

  #renderList() {

  }

  #emplyListMessageHandler = () => {
    if ((this.events.length === 0)) {
      this.#emptyListMessage.element.remove();
    }
  };


}
