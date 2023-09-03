import { exitModalByClick } from "../pages/index.js";

function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  document.addEventListener("click", exitModalByClick);
}

function closePopup(modal) {
  if (modal == "#add-card-modal") {
    modal.querySelector("modal__button").disable = true;
  }
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  document.removeEventListener("click", exitModalByClick);
}

export { openPopup, closePopup };
