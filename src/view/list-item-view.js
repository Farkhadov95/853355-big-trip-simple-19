import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDueDate } from '../utils.js';

function createListItemTemplate(event) {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = event;

  const formattedDateFrom = humanizeEventDueDate(dateFrom);
  const formattedDateTo = humanizeEventDueDate(dateTo);

  const offersTemplate = offers.slice(0, 2).map((offer) => (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
  )).join('');

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-19">MAR 19</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-19T11:20">${formattedDateFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-19T13:00">${formattedDateTo}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class ListItemView extends AbstractView{
  #event = null;
  #handleEditClick = null;

  constructor({event, onEditClick}) {
    super();
    this.#event = event;

    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createListItemTemplate(this.#event);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
