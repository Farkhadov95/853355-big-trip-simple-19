import AddEventView from '../view/add-event-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';
import { nanoid } from 'nanoid';


export default class NewEventPresenter {
  #eventsListContainer = null;
  #addEventComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor({eventsListContainer, onDataChange, onDestroy}) {
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#addEventComponent !== null) {
      return;
    }

    this.#addEventComponent = new AddEventView({
      onCloseClick: this.#handleDeleteClick,
      onFormSubmit: this.#handleFormSubmit,
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

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {id: nanoid(), ...event}
    );
    this.destroy();
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
