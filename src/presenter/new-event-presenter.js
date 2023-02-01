import AddEventView from '../view/add-event-view.js';
import { UserAction, UpdateType} from '../const.js';
import { remove, render, replace, RenderPosition } from '../framework/render.js';


export default class NewEventPresenter {
  #eventsListContainer = null;
  #addEventComponent = null;
  #event = null;
  #handleDataChange = null;
  #handleAddButtonClick = null;
  #emptyListHandler = null;

  constructor({eventsListContainer, onDataChange, onAddButtonClick, onEmptyList}) {
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleAddButtonClick = onAddButtonClick;
    this.#emptyListHandler = onEmptyList;
  }

  init(event) {
    this.#handleAddButtonClick.addEventListener('click', () => {
      this.#addEventComponent = new AddEventView({
        event: event,
        onCloseClick: this.#handleCloseClick,
        onFormSubmit: this.#handleNewEventFormSubmit,
      });
      render(this.#addEventComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    });
  }

  destroy() {
    // remove(this.#listItemComponent);
    // remove(this.#editListItemComponent);
  }


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#handleCloseClick();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleNewEventFormSubmit = (event) => {
    this.#handleDataChange(event);
    this.#emptyListHandler();
    this.#handleCloseClick();
  };


  #handleCloseClick = () => {
    this.#addEventComponent.element.remove();
  };
}
