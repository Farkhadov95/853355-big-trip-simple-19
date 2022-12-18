import AddPointView from '../view/add-point-view.js';
import ListItemView from '../view/list-item-view.js';
import {render} from '../render.js';

export default class EventsPresenter {

  constructor({eventsListContainer, eventsModel}) {
    this.eventsListContainer = eventsListContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];
    const eventsListContainer = document.querySelector('.trip-events');
    const eventsList = document.createElement('ul');
    eventsList.classList.add('trip-events__list');
    eventsListContainer.appendChild(eventsList);

    render(new AddPointView(), eventsList);

    for (let i = 0; i < this.events.length; i++) {
      // console.log(eventsList);
      render(new ListItemView(this.events[i]), eventsList);
    }
  }
}
