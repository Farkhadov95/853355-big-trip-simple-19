import ListItemView from '../view/list-item-view.js';
import EditEventView from '../view/edit-event-view.js';
import { UserAction, UpdateType} from '../const.js';
import { remove, render, replace } from '../framework/render.js';

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
    const prevAddEventComponent = this.#addEventComponent;

    this.#listItemComponent = new ListItemView({
      event: this.#event,
      onEditClick: this.#handleEditClick
    });

    this.#editListItemComponent = new EditEventView({
      event: this.#event,
      onRollUpClick: this.#handleRollUpClick,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevListItemComponent === null || prevEditListItemComponent === null) {
      render(this.#listItemComponent, this.#eventsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#listItemComponent, prevListItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      // replace(this.#editListItemComponent, prevEditListItemComponent);
      replace(this.#listItemComponent, prevEditListItemComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevListItemComponent);
    remove(prevEditListItemComponent);
    remove(prevAddEventComponent);
  }

  destroy() {
    remove(this.#listItemComponent);
    remove(this.#editListItemComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editListItemComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editListItemComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#listItemComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editListItemComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editListItemComponent.shake(resetFormState);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editListItemComponent.reset(this.#event);
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
      this.#editListItemComponent.reset(this.#event);
      this.#replaceEditToEvent();
    }
  };

  #handleFormSubmit = (update) => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      update
    );
    // this.#replaceEditToEvent();
  };

  #handleDeleteClick = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };

  #handleEditClick = () => {
    this.#replaceEventToEdit();
  };

  #handleRollUpClick = () => {
    this.#replaceEditToEvent();
  };

}
