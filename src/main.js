import ListFilterView from './view/list-filter-view.js';
import EventsModel from './model/events-model.js';
import EventsListView from './view/events-list-view.js';
import {render} from './framework/render.js';
import ListPresenter from './presenter/list-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const pageMainContainer = document.querySelector('.page-body__page-main');
const eventsListContainer = pageMainContainer.querySelector('.trip-events');
const addEventButton = document.querySelector('.trip-main__event-add-btn');

const eventListComponent = new EventsListView();
const eventsModel = new EventsModel();
const listPresenter = new ListPresenter({
  eventsListContainer: eventsListContainer,
  eventsModel,
  eventListComponent,
  addEventButton
});

render(new ListFilterView(), filtersContainer);

listPresenter.init();

