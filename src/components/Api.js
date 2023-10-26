export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else Promise.reject(res.status);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  addNewCard(newCardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link,
      }),
    }).then(this._checkServerResponse);
  }

  deleteNewCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  editProfileData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        about: data.description,
      }),
    }).then(this._checkServerResponse);
  }

  toggleCardLike(cardId, isLiked) {
    let method = "";
    if (isLiked) {
      method = "DELETE";
    } else {
      method = "PUT";
    }
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  updateProfilePicture(picLink) {
    const data = {
      avatar: picLink,
    };
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkServerResponse);
  }

  loadInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  loadInitialProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkServerResponse);
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "675ffc74-7010-43d4-a4e4-01622ad8dbf1",
    "Content-Type": "application/json",
  },
});
