import EventsModel from './model/events-model.js';
import EventsListView from './view/events-list-view.js';
import {render} from './framework/render.js';
import ListPresenter from './presenter/list-presenter.js';
import NewEventButtonView from './view/add-event-button-view.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsApiService from './events-api-service.js';

const AUTHORIZATION = 'Basic KS2sAV21fdL5sa9j';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-main__trip-controls');
const pageMainContainer = document.querySelector('.page-body__page-main');
const eventsListContainer = pageMainContainer.querySelector('.trip-events');

const eventListComponent = new EventsListView();

const eventsModel = new EventsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

const filterPresenter = new FilterPresenter({
  filtersContainer,
  filterModel,
  eventsModel
});

const listPresenter = new ListPresenter({
  eventsListContainer: eventsListContainer,
  eventsModel,
  filterModel,
  eventListComponent,
  onNewEventDestroy: handleNewEventFormClose
});

function handleNewEventButtonClick() {
  listPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

filterPresenter.init();
listPresenter.init();
eventsModel.init()
  .finally(() => {
    render(newEventButtonComponent, tripMainContainer);
  });


