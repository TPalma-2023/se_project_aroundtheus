import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputEls = [...this._modalForm.querySelectorAll(".modal__input")];
    this._inputValues = {};
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  _getInputValues() {
    this._inputEls.forEach((inputEl) => {
      this._inputValues[inputEl.name] = inputEl.value;
    });

    return this._inputValues;
  }

  setInputValues(data) {
    this._inputEls.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}
