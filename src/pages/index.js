import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openPopup, closePopup } from "../utils/utils.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupFormSubmit from "../components/PopupFormSubmit.js";
import "./index.css";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const editProfileImageModal = document.querySelector("#edit-profile-picture");
const modalImage = document.querySelector("#image-modal");
const profilePictureImage = document.querySelector(".profile__image");
const editProfileImageButton = document.querySelector(".profile__image-button");
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

/* -------------------------------------------------------------------------- */
/*                               Form Validators                              */
/* -------------------------------------------------------------------------- */

const profileFormValidator = new FormValidator(settings, profileEditModal);
profileFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, addCardModal);
addFormValidator.enableValidation();

const editProfilePicFormValidator = new FormValidator(
  settings,
  editProfileImageModal
);
editProfilePicFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                        Class Insantiation Constants                        */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "675ffc74-7010-43d4-a4e4-01622ad8dbf1",
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/*                            Profile Picture Edit                            */
/* -------------------------------------------------------------------------- */

function loadInitialProfilePicture() {
  api
    .loadInitialProfileData()
    .then((profileData) => {
      profilePictureImage.src = profileData.avatar;
    })
    .catch((error) => {
      console.error(error);
    });
}

loadInitialProfilePicture();

/* -------------------------------------------------------------------------- */
/*                               Event Hanlders                               */
/* -------------------------------------------------------------------------- */

function handleEditProfileSubmit(formData) {
  modalEditForm.setSubmitText(true);
  api
    .editProfileData(formData)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      userInfo.setUserInfo(data);
      modalEditForm.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => modalEditForm.setSubmitText(false));
}

function handleEditProfilePictureSubmit(data) {
  profilePictureImage.src = data.url;
  editProfilePicture.setSubmitText(true);
  api
    .updateProfilePicture(data.url)
    .then(() => {
      editProfilePicture.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleImageClick(data) {
  modalPreviewImage.open(data);
}

function handleRemoveCard(data) {
  removeCardModal.open();
  removeCardModal.setSubmithandler(() => {
    removeCardModal.setSubmitText(true);
    api
      .deleteNewCard(data._id)
      .then(() => {
        removeCardModal.close();
        data._handleDeleteButton();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => removeCardModal.setSubmitText(false));
  });
}

function handleAddCardSubmit(data) {
  addCardImageModal.setSubmitText(true);
  const name = data.title;
  const link = data.url;

  if (name && link) {
    const newCard = {
      name: name,
      link: link,
    };

    api
      .addNewCard(newCard)
      .then((newCardData) => {
        renderCard(newCardData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => addCardImageModal.setSubmitText(false));
  }
}

function handleCardLike(data) {
  const isLiked = data.isLiked();
  const cardId = data.getId();

  api
    .toggleCardLike(cardId, isLiked)
    .then((updatedData) => {
      data.setLikes(updatedData.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
}

/* -------------------------------------------------------------------------- */
/*                  PopupWithForm, PopupWithImage, PopupFormSubmit instances  */
/* -------------------------------------------------------------------------- */

const editProfilePicture = new PopupWithForm(
  "#edit-profile-picture",
  handleEditProfilePictureSubmit
);
editProfilePicture.setEventListeners();

const removeCardModal = new PopupFormSubmit("#delete-card-modal");
removeCardModal.setEventListeners();

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

const modalPreviewImage = new PopupWithImage("#image-modal");
modalPreviewImage.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                           Button Event Listeners                           */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  profileTitleInput.value = user.name;
  profileDescriptionInput.value = user.description;
  modalEditForm.open();
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator._disableSubmitButton();
  addCardImageModal.open();
});

editProfileImageButton.addEventListener("click", () => {
  editProfilePicFormValidator._disableSubmitButton();
  editProfilePicture.open();
});

/* -------------------------------------------------------------------------- */
/*                            Card Functionalities                            */
/* -------------------------------------------------------------------------- */

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleRemoveCard,
    handleCardLike
  );

  return card.getView();
}

function renderCard(cardData) {
  const cardEl = createCard(cardData);

  section.addItem(cardEl);
}

let section;
Promise.all([api.loadInitialProfileData(), api.getInitialCards()])
  .then(([data, initialCards]) => {
    userInfo.setUserInfo(data);
    userInfo.setUserProfilePicture(data.avatar);
    section = new Section(
      {
        items: initialCards.reverse(),
        renderer: (item) => {
          const cardElement = createCard(item);
          section.addItem(cardElement);
        },
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((error) => {
    console.error(error);
  });
