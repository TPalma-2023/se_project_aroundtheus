export default class FormValidator {
  constructor(selectors, formElement) {
    this._formElement = formElement;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._form = formElement;
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);

    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _setEventListeners() {
    const inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    const submitButton = this._form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(
          inputEls,
          submitButton,
          this._inactiveButtonClass
        );
      });
    });
  }

  _toggleButtonState(inputList, _buttonElement, _inactiveButtonClass) {
    _buttonElement.disabled = true;
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton();
    } else {
      _buttonElement.classList.remove(_inactiveButtonClass);
      _buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  _disableSubmitButton() {
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.disabled = true;
  }
}
