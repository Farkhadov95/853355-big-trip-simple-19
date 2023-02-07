import AddEventView from '../view/add-event-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';


export default class NewEventPresenter {
  #eventsListContainer = null;
  #addEventComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor({eventsListContainer, onDataChange, onDestroy }) {
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinationsList) {
    if (this.#addEventComponent !== null) {
      return;
    }
    this.#addEventComponent = new AddEventView({
      onCloseClick: this.#handleDeleteClick,
      onFormSubmit: this.#handleFormSubmit,
      destinationsList,
    });

    render(this.#addEventComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#addEventComponent === null) {
      return;
    }

    this.#handleDestroy();
    remove(this.#addEventComponent);
    this.#addEventComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#addEventComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#addEventComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#addEventComponent.shake(resetFormState);
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event
    );
  };


  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
