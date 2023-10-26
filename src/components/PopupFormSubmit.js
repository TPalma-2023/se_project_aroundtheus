import Popup from "./Popup.js";

export default class PopupFormSubmit extends Popup {
  constructor(selector) {
    super(selector);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._submitButton = this._modalForm.querySelector(".modal__button");
    this._submitButtonContent = this._submitButton.textContent;
  }

  setSubmitText(submit) {
    if (submit) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = this._submitButtonContent;
    }
  }

  setSubmithandler(handler) {
    this._submitHandler = handler;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
    super.setEventListeners();
  }
}
