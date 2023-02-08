import he from 'he';
import { humanizeEventDueDate } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createEditItemTemplate(data, destinationsList, offersList) {
  const {
    basePrice,
    dateFrom,
    dateTo,
    offers,
    destination,
    type,
    isSaving,
    isDeleting,
    isDisabled
  } = data;

  const destinationOptions = destinationsList.map((dest) => (
    `<option value="${dest.name}"></option>`
  )).join('');

  const formattedDateFrom = humanizeEventDueDate(dateFrom);
  const formattedDateTo = humanizeEventDueDate(dateTo);

  const filteredOffers = offers.filter((x) => (x) !== undefined);
  const availableOffersByType = offersList.find((offer) => offer.type === type).offers;
  const filteredOffersIDs = [];
  filteredOffers.forEach((offer) => filteredOffersIDs.push(offer.id));

  function createOffersTemplate() {
    if (availableOffersByType.length !== 0) {
      return `
      <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        <!-- Offers -->
      ${availableOffersByType.map((offer) => (
    `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${offer.id}"
            type="checkbox" name="${offer.title}" 
            ${filteredOffersIDs.includes(offer.id) ? 'checked' : ''}
            ${isDisabled ? 'disabled' : ''}>
          <label class="event__offer-label" for="${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
  )).join('')}
      </div>
      </section>`;
    }
    return '';
  }

  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group" ${isDisabled ? 'disabled' : ''}>
              <legend class="visually-hidden">Event type</legend>
              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === 'taxi' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === 'bus' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === 'train' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === 'ship' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === 'drive' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === 'flight' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === 'check-in' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type === 'sightseeing' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type === 'restaurant' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination"
           id="event-destination-1" type="text"
            name="event-destination" 
            value="${destination.name}"
            list="destination-list-1" ${isDisabled ? 'disabled' : ''}
            required>
          <datalist id="destination-list-1">
            ${destinationOptions}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedDateFrom}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedDateTo}" ${isDisabled ? 'disabled' : ''}>
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(String(basePrice))}" ${isDisabled ? 'disabled' : ''}>
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
          ${createOffersTemplate()}
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
        </section>
      </section>
    </form>`
  );
}

export default class EditEventView extends AbstractStatefulView{
  #handleRollUpClose = null;
  #handleFormSubmit = null;
  #hadleDeleteClick = null;
  #datepicker = null;
  #destinationList = [];
  #offersList = [];

  constructor({event, onRollUpClick, onFormSubmit, onDeleteClick, destinationsList, offersList}) {
    super();
    this._setState(EditEventView.parseEventToState(event));

    this.#handleRollUpClose = onRollUpClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#hadleDeleteClick = onDeleteClick;
    this.#destinationList = destinationsList;
    this.#offersList = offersList;

    this._restoreHandlers();
  }

  get template() {
    return createEditItemTemplate(this._state, this.#destinationList, this.#offersList);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset(event) {
    this.updateElement(
      EditEventView.parseEventToState(event)
    );
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollUpClose();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditEventView.parseStateToEvent(this._state));
  };

  static parseEventToState(event) {
    return {
      ...event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state) {
    const event = {state};
    return event;
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value
    });
  };

  #getAllDestinationsNames() {
    const array = [];
    this.#destinationList.forEach((dest) => array.push(dest.name));
    return array;
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value && this.#getAllDestinationsNames().includes(evt.target.value)) {
      this.updateElement({
        destination: this.#destinationList.find((dest) => dest.name === evt.target.value)
      });
    } else {
      evt.target.setCustomValidity('Current option is not available');
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: Number(evt.target.value)
    });
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#hadleDeleteClick(EditEventView.parseStateToEvent(this._state));
  };

  #dateFromChangeHandler = ([userDateFrom]) => {
    this.updateElement({
      dateFrom: userDateFrom,
    });
  };

  #dateToChangeHandler = ([userDateTo]) => {
    this.updateElement({
      dateTo: userDateTo
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();

    const selectedOffers = [];
    const offersAvailableByType = this.#offersList
      .find((offer) => offer.type === this._state.type).offers;
    this.element.querySelectorAll('input.event__offer-checkbox:checked')
      .forEach((input) => selectedOffers.push(Number(input.id)));

    this.updateElement({
      offers: selectedOffers.map((id) => {
        const offersMatching = offersAvailableByType.find(
          (offer) => offer.id === id,
        );
        return offersMatching;
      }),
    });
  };

  #setDateFromPicker() {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y h:i',
        enableTime: true,
        defaultDate: [this._state.dateFrom],
        onChange: this.#dateFromChangeHandler,
      }
    );
  }

  #setDateToPicker() {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y h:i',
        enableTime: true,
        defaultDate: [this._state.dateTo],
        onChange: this.#dateToChangeHandler,
      }
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);
    this.element.addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    const offersContainer = this.element.querySelector('.event__available-offers');
    if (offersContainer) {
      this.element.querySelector('.event__available-offers')
        .addEventListener('change', this.#offersChangeHandler);
    }

    this.#setDateFromPicker();
    this.#setDateToPicker();
  }
}
