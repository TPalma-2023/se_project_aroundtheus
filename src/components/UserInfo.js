export default class UserInfo {
  constructor(
    userNameSelector,
    userDescriptionSelector,
    profilePictureSelector
  ) {
    this._userNameEl = document.querySelector(userNameSelector);
    this._userJobEl = document.querySelector(userDescriptionSelector);
    this._profilePictureSelectorEl = document.querySelector(
      profilePictureSelector
    );
  }

  getUserInfo() {
    return {
      name: this._userNameEl.textContent,
      description: this._userJobEl.textContent,
    };
  }

  setUserInfo(data) {
    this._userNameEl.textContent = data.name;
    this._userJobEl.textContent = data.about;
  }

  setUserProfilePicture(link) {
    this._profilePictureSelectorEl.src = link;
  }
}
