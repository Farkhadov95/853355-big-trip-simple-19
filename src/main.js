// import AddPointButtonView from './view/add-point-view.js';
import ListFilterView from './view/list-filter-view.js';
import ListSortView from './view/list-sort-view.js';
import EventsPresenter from './presenter/eventsPresenter.js';
import {render} from './render.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');

const pageMainContainer = document.querySelector('.page-body__page-main');
const eventsListContainer = pageMainContainer.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter();

render(new ListFilterView(), filtersContainer);
render(new ListSortView(), eventsListContainer);

eventsPresenter.init();

