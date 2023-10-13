export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector) {
    this._userNameEl = document.querySelector(userNameSelector);
    this._userJobEl = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameEl.textContent,
      description: this._userJobEl.textContent,
    };
  }

  setUserInfo(data) {
    this._userNameEl.textContent = data.title;
    this._userJobEl.textContent = data.description;
  }
}
