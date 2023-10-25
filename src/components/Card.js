export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleRemoveButton,
    handleCardLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleImageClick;
    this._data = data;
    this._handleRemoveButton = handleRemoveButton;
    this._handleCardLike = handleCardLike;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike(this);
    });

    this._element
      .querySelector(".card__remove-button")
      .addEventListener("click", () => {
        this._handleRemoveButton(this);
      });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  handleIsLiked() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  getId() {
    return this._id;
  }

  setLikes(likes) {
    this._isLiked = likes;
    this.handleIsLiked();
  }

  isLiked() {
    return this._isLiked;
  }

  handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this.handleIsLiked();
    this._setEventListeners();

    return this._element;
  }
}
