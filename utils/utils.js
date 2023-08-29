export default class Utils {
  modalImage = document.querySelector("#image-modal");
  modalImageCloseButton = modalImage.querySelector(".modal__button-close");
  imageModalEl = modalImage.querySelector(".modal__image");
  imageCaption = modalImage.querySelector(".modal__caption");

  closeModalByEscape(e) {
    if (e.key === "Escape") {
      const openedPopup = document.querySelector(".modal__opened");
      closePopup(openedPopup);
    }
  }

  openPopup(modal) {
    document.addEventListener("keydown", closeModalByEscape);
    modal.classList.add("modal__opened");
  }

  closePopup(modal) {
    modal.classList.remove("modal__opened");
    document.removeEventListener("keydown", closeModalByEscape);
  }
}
