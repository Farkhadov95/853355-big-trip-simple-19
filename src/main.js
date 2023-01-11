import ListFilterView from './view/list-filter-view.js';
import ListSortView from './view/list-sort-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';
import EventsListView from './view/events-list-view.js';
import AddEventView from './view/add-event-view.js';
import {render, RenderPosition} from './render.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const pageMainContainer = document.querySelector('.page-body__page-main');
const eventsListContainer = pageMainContainer.querySelector('.trip-events');
const addNewEventButton = document.querySelector('.trip-main__event-add-btn');

const eventListComponent = new EventsListView();
const addEventComponent = new AddEventView();
const eventsModel = new EventsModel();
const eventsPresenter = new EventsPresenter({
  eventsListContainer: eventsListContainer,
  eventsModel,
});

render(new ListFilterView(), filtersContainer);
render(new ListSortView(), eventsListContainer);
render(eventListComponent, eventsListContainer);

eventsPresenter.init();

function renderAddEvent() {
  const cancelButton = addEventComponent.element.querySelector('.event__reset-btn');
  render(addEventComponent, eventListComponent.element, RenderPosition.AFTERBEGIN);

  cancelButton.addEventListener('click', () => {
    addEventComponent.element.remove();
  });
}

addNewEventButton.addEventListener('click', () => {
  const emptyListMessage = document.querySelector('.trip-events__msg');
  if (document.contains(emptyListMessage)) {
    emptyListMessage.remove();
  }
  renderAddEvent(addNewEventButton);
});
