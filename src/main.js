// import AddPointButtonView from './view/add-point-view.js';
import ListFilterView from './view/list-filter-view.js';
import ListSortView from './view/list-sort-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';
import {render} from './render.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');

const pageMainContainer = document.querySelector('.page-body__page-main');
const eventsListContainer = pageMainContainer.querySelector('.trip-events');

const eventsModel = new EventsModel();
const eventsPresenter = new EventsPresenter({
  eventsListContainer: eventsListContainer,
  eventsModel,
});

render(new ListFilterView(), filtersContainer);
render(new ListSortView(), eventsListContainer);

eventsPresenter.init();
