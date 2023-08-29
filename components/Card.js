const modalImage = document.querySelector("#image-modal");
const modalImageCloseButton = modalImage.querySelector(".modal__button-close");
const imageModalEl = modalImage.querySelector(".modal__image");
const imageCaption = modalImage.querySelector(".modal__caption");

function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".modal__opened");
    closePopup(openedPopup);
  }
}

function openPopup(modal) {
  document.addEventListener("keydown", closeModalByEscape);
  modal.classList.add("modal__opened");
}

function closePopup(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._element = this._getTemplate();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
  }
}
