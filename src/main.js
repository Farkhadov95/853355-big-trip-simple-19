// import AddPointButtonView from './view/add-point-view.js';
import FilterView from './view/list-filter-view.js';
import SortView from './view/list-sort-view.js';
import EventsPresenter from './presenter/eventsPresenter.js';
import {render} from './render.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');

const pageMainContainer = document.querySelector('.page-body__page-main');
const eventsListContainer = pageMainContainer.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter();

render(new FilterView(), filtersContainer);
render(new SortView(), eventsListContainer);

eventsPresenter.init();

