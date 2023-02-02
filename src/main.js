import ListFilterView from './view/list-filter-view.js';
import EventsModel from './model/events-model.js';
import EventsListView from './view/events-list-view.js';
import {render} from './framework/render.js';
import ListPresenter from './presenter/list-presenter.js';
import NewEventButtonView from './view/add-event-button-view.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const pageMainContainer = document.querySelector('.page-body__page-main');
const eventsListContainer = pageMainContainer.querySelector('.trip-events');


const eventListComponent = new EventsListView();
const eventsModel = new EventsModel();

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

render(newEventButtonComponent, tripMainContainer);

const listPresenter = new ListPresenter({
  eventsListContainer: eventsListContainer,
  eventsModel,
  eventListComponent,
  onNewEventDestroy: handleNewEventFormClose
});

render(new ListFilterView(), filtersContainer);

function handleNewEventButtonClick() {
  listPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

listPresenter.init();

