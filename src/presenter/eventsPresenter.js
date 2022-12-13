import AddPointView from '../view/add-point-view.js';
import ListItemView from '../view/list-item-view.js';
import {render} from '../render.js';

export default class EventsPresenter {

  init() {
    const eventsListContainer = document.querySelector('.trip-events');
    const eventList = document.createElement('ul');
    eventList.classList.add('trip-events__list');
    eventsListContainer.appendChild(eventList);

    render(new AddPointView(), eventList);

    for (let i = 0; i < 3; i++) {
      render(new ListItemView(), eventList);
    }
  }
}
