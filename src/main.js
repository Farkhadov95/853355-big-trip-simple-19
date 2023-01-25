import ListFilterView from './view/list-filter-view.js';
import EventsModel from './model/events-model.js';
import EventsListView from './view/events-list-view.js';
import AddEventView from './view/add-event-view.js';
import {render, RenderPosition} from './framework/render.js';
import ListPresenter from './presenter/list-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const pageMainContainer = document.querySelector('.page-body__page-main');
const eventsListContainer = pageMainContainer.querySelector('.trip-events');
const addNewEventButton = document.querySelector('.trip-main__event-add-btn');

const eventListComponent = new EventsListView();
const addEventComponent = new AddEventView();
const eventsModel = new EventsModel();
const listPresenter = new ListPresenter({
  eventsListContainer: eventsListContainer,
  eventsModel,
  eventListComponent
});

render(new ListFilterView(), filtersContainer);

listPresenter.init();

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
  renderAddEvent();
});
