import ListItemView from '../view/list-item-view.js';
import EditEventView from '../view/edit-event-view.js';
import AddEventView from '../view/add-event-view.js';
import { UserAction, UpdateType} from '../const.js';
import { remove, render, replace, RenderPosition } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class EventPresenter {
  #eventsListContainer = null;
  #listItemComponent = null;
  #editListItemComponent = null;
  #addEventComponent = null;
  #event = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #handleAddButtonClick = null;
  #emptyListHandler = null;

  #mode = Mode.DEFAULT;


  constructor({eventsListContainer, onDataChange, onModeChange, onAddButtonClick, onEmptyList}) {
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#handleAddButtonClick = onAddButtonClick;
    this.#emptyListHandler = onEmptyList;
  }

  init(event) {
    this.#event = event;

    const prevListItemComponent = this.#listItemComponent;
    const prevEditListItemComponent = this.#editListItemComponent;
    const prevAddEventComponent = this.#addEventComponent;

    this.#listItemComponent = new ListItemView({
      event,
      onEditClick: this.#handleEditClick
    });

    this.#editListItemComponent = new EditEventView({
      event,
      onRollUpClick: this.#handleRollUpClick,
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
    remove(prevAddEventComponent);
  }

  initAddEvent(event) {
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
    remove(this.#listItemComponent);
    remove(this.#editListItemComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditToEvent();
    }
  }

  #replaceEventToEdit() {
    replace(this.#editListItemComponent, this.#listItemComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditToEvent() {
    replace(this.#listItemComponent, this.#editListItemComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      if (this.#mode !== Mode.DEFAULT) {
        this.#replaceEditToEvent();
        return;
      }
      this.#handleCloseClick();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      event
    );
    this.#replaceEditToEvent();
  };

  #handleNewEventFormSubmit = (event) => {
    this.#handleDataChange(event);
    this.#emptyListHandler();
    this.#handleCloseClick();
  };

  #handleEditClick = () => {
    this.#replaceEventToEdit();
  };

  #handleRollUpClick = () => {
    this.#replaceEditToEvent();
  };

  #handleCloseClick = () => {
    this.#addEventComponent.element.remove();
  };
}
