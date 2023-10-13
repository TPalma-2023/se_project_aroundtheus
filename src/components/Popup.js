export default class Popup {
  constructor(modalSelector) {
    this._modalElement = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _clickToCloseOpenedModal(evt) {
    if (
      evt.target.classList.contains("modal__button-close") ||
      evt.target.classList.contains("modal_opened")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._modalElement.addEventListener("mousedown", (evt) => {
      this._clickToCloseOpenedModal(evt);
    });
  }
}
