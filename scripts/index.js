const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

function closePopup(modal) {
  modal.classList.remove("modal__opened");
}

function openPopup(modal) {
  modal.classList.add("modal__opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardLinkEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const removeButton = cardElement.querySelector(".card__remove-button");
  const imageElement = cardElement.querySelector(".card__image");
  const imageModalEl = modalImage.querySelector(".modal__image");
  const imageCaption = modalImage.querySelector(".modal__caption");

  cardTitleEl.textContent = cardData.name;
  cardLinkEl.src = cardData.link;
  cardLinkEl.alt = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  removeButton.addEventListener("click", () => {
    cardElement.remove();
  });

  imageElement.addEventListener("click", () => {
    openPopup(modalImage);
    imageModalEl.src = cardData.link;
    imageModalEl.alt = cardData.name;
    imageCaption.textContent = cardData.name;
    console.log(imageCaption);
    console.log(imageCaption.textContent);
  });

  return cardElement;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
}

profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardCloseButton.addEventListener("click", () => closePopup(addCardModal));
profileEditFormElement.addEventListener("submit", handleProfileFormSubmit);
cardAddFormElement.addEventListener("submit", handleAddCardFormSubmit);
modalImageCloseButton.addEventListener("click", () => closePopup(modalImage));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
