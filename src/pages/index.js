import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openPopup, closePopup } from "../utils/utils.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";
import "./index.css";

// Variables
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const modalImage = document.querySelector("#image-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = profileEditModal.querySelector(
  ".modal__button-close"
);
const addCardCloseButton = addCardModal.querySelector(".modal__button-close");
const modalImageCloseButton = modalImage.querySelector(".modal__button-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditFormElement = profileEditModal.querySelector(".modal__form");
const cardAddFormElement = addCardModal.querySelector(".modal__form");
const profileTitleInput = document.querySelector("#profile-title-input");
const cardTitleInput = cardAddFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = cardAddFormElement.querySelector(".modal__input_type_url");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardSelector = "#card-template";

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");

// Initialize components
const userInfo = new UserInfo(".profile__title", ".profile__description");

const modalPreviewImage = new PopupWithImage("#image-modal");
modalPreviewImage.setEventListeners();

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = renderCard(item);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);
section.renderItems();

const profileFormValidator = new FormValidator(settings, profileEditModal);
profileFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, addCardModal);
addFormValidator.enableValidation();

// Event listeners
profileEditButton.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  profileTitleInput.value = user.name;
  profileDescriptionInput.value = user.description;
  modalEditForm.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardImageModal.open();
});

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);

  return card.getView();
}

function handleEditProfileSubmit(data) {
  userInfo.setUserInfo(data);
  modalEditForm.close();
}

function handleImageClick(data) {
  modalPreviewImage.open(data);
}

function handleAddCardSubmit(data) {
  const name = data.title;
  const link = data.url;
  if (name && link) {
    const newCard = {
      name: name,
      link: link,
    };

    const newCardEl = renderCard(newCard);

    section.addItem(newCardEl);
    addFormValidator._disableAfterSubmission();
  }
}

const modalEditForm = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileSubmit
);
modalEditForm.setEventListeners();

const addCardImageModal = new PopupWithForm(
  "#add-card-modal",
  handleAddCardSubmit
);
addCardImageModal.setEventListeners();
