import ListItemView from '../view/list-item-view.js';
import EditEventView from '../view/edit-event-view.js';
import { remove, render, replace } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class EventPresenter {
  #eventsListContainer = null;
  #listItemComponent = null;
  #editListItemComponent = null;
  #event = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor({eventsListContainer, onDataChange, onModeChange}) {
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevListItemComponent = this.#listItemComponent;
    const prevEditListItemComponent = this.#editListItemComponent;

    this.#listItemComponent = new ListItemView({
      event,
      onEditClick: () => {
        this.#replaceEventToEdit.call(this);
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#editListItemComponent = new EditEventView({
      event,
      onCloseClick: () => {
        this.#replaceEditToEvent.call(this);
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFormSubmit: this.#handleFormSubmit
    });

    if (prevListItemComponent === null || prevEditListItemComponent === null) {
      render(this.#listItemComponent, this.#eventsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#listItemComponent, prevListItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editListItemComponent, prevEditListItemComponent);
    }

    remove(prevListItemComponent);
    remove(prevEditListItemComponent);
  }

  destroy() {
    remove(this.#listItemComponent);
    remove(this.#editListItemComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditToEvent();
    }
  }

  #replaceEventToEdit() {
    this.#eventsListContainer.replaceChild(this.#editListItemComponent.element, this.#listItemComponent.element);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditToEvent() {
    this.#eventsListContainer.replaceChild(this.#listItemComponent.element, this.#editListItemComponent.element);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(event);
    this.#replaceEditToEvent();
  };
}
