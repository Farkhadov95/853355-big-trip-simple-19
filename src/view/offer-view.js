import { createElement, render} from '../render.js';

function createOfferTemplate(offer) {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="${offer.title}" checked>
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
}

export default class OfferView {
  #element = null;
  #offer = null;

  constructor(offer) {
    this.#offer = offer;
  }

  get template() {
    return createOfferTemplate(this.#offer);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

  renderOffers(offers, container) {
    const offersContainer = container.querySelector('.event__available-offers');
    offers.forEach((offer) => {
      render(new OfferView(offer), offersContainer);
    });
  }


}
