import ListItemView from '../view/list-item-view.js';
import EditEventView from '../view/edit-event-view.js';
import { render } from '../render.js';
import EventsListView from '../view/events-list-view.js';
import { getMockOffersByType } from '../utils.js';
import EmptyListView from '../view/list-empty-view.js';

export default class EventsPresenter {
  #eventListComponent = new EventsListView();
  #emptyList = new EmptyListView();

  #eventsListContainer = null;
  #eventsModel = null;

  constructor({eventsListContainer, eventsModel}) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.#eventsModel.events];

    render(this.#eventListComponent, this.#eventsListContainer);

    if (this.events.length === 0) {
      render(this.#emptyList, this.#eventListComponent.element);
      return;
    }

    for (const event of this.events) {
      const eventsWithSelectedOffers = {
        ...event,
        offers: event.offers.map((id) => {
          const offer = getMockOffersByType(event).find(
            (mockOffer) => mockOffer.id === id,
          );
          return offer;
        }),
      };

      this.#renderListItem((eventsWithSelectedOffers), this.#eventListComponent.element);
    }
  }

  #renderListItem(event) {

    const listItemComponent = new ListItemView({
      event,
      onEditClick: () => {
        replaceEventToEdit.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editComponent = new EditEventView({
      event,
      onCloseClick: () => {
        replaceEditToEvent.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceEventToEdit() {
      this.#eventListComponent.element.replaceChild(editComponent.element, listItemComponent.element);
    }

    function replaceEditToEvent() {
      this.#eventListComponent.element.replaceChild(listItemComponent.element, editComponent.element);
    }

    function escKeyDownHandler(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }

    render(listItemComponent, this.#eventListComponent.element);
  }
}
