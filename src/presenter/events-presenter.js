import ListItemView from '../view/list-item-view.js';
import EditEventView from '../view/edit-event-view.js';
import {render, RenderPosition} from '../render.js';
import EventsListView from '../view/events-list-view.js';
import AddEventView from '../view/add-event-view.js';
import { getOffersByType } from '../utils.js';
import EmptyListView from '../view/list-empty-view.js';


export default class EventsPresenter {
  #eventListComponent = new EventsListView();
  #emptyList = new EmptyListView();

  constructor({eventsListContainer, eventsModel}) {
    this.eventsListContainer = eventsListContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];

    render(this.#eventListComponent, this.eventsListContainer);

    const addNewEventButton = document.querySelector('.trip-main__event-add-btn');
    addNewEventButton.addEventListener('click', () => {
      render(new AddEventView(), this.#eventListComponent.getElement(), RenderPosition.AFTERBEGIN);
    });

    if (this.events.length === 0) {
      render(this.#emptyList, this.#eventListComponent.getElement());
    } else {
      for (const event of this.events) {
        this.#renderListItem((
          {
            ...event,
            offers: event.offers.map((id) => {
              const offer = getOffersByType(event).find(
                (mockOffer) => mockOffer.id === id,
              );
              return offer || {};
            }
            )
          }
        ), this.#eventListComponent.getElement());
      }
    }
  }

  #renderListItem(point) {
    const listItemComponent = new ListItemView(point);
    const editComponent = new EditEventView(point);

    const replaceEventToEdit = () => {
      this.#eventListComponent.getElement().replaceChild(editComponent.getElement(), listItemComponent.getElement());
    };

    const replaceEditToEvent = () => {
      this.#eventListComponent.getElement().replaceChild(listItemComponent.getElement(), editComponent.getElement());
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    listItemComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEventToEdit();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    editComponent.getElement().addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    editComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(listItemComponent, this.#eventListComponent.element);
  }
}
