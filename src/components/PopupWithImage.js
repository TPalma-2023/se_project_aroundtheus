import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalImage = document.querySelector(".modal__image");
    this._modalImageDescription = document.querySelector(".modal__caption");
    this.setEventListeners();
  }

  open(data) {
    this._modalImage.src = data.link;
    this._modalImage.alt = data.name;
    this._modalImageDescription.textContent = data.name;

    super.open();
  }
}
