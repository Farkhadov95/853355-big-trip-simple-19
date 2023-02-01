import ListFilterView from './view/list-filter-view.js';
import EventsModel from './model/events-model.js';
import EventsListView from './view/events-list-view.js';
import {render} from './framework/render.js';
import ListPresenter from './presenter/list-presenter.js';
// import AddEventView from '../view/add-event-view.js';

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


//Move to separate view later
// addEventButton.addEventListener('click', () => {
//   const addEventComponent = new AddEventView({
//     event: event,
//     onCloseClick: this.#handleCloseClick,
//     onFormSubmit: this.#handleNewEventFormSubmit,
//   });
//   render(this.#addEventComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
//   document.addEventListener('keydown', this.#escKeyDownHandler);
// });

