export default class Api {
  constructor() {}

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "675ffc74-7010-43d4-a4e4-01622ad8dbf1",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewCard(newCardData) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "675ffc74-7010-43d4-a4e4-01622ad8dbf1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteNewCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "675ffc74-7010-43d4-a4e4-01622ad8dbf1",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  editProfileData(data) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "675ffc74-7010-43d4-a4e4-01622ad8dbf1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.title,
        about: data.description,
      }),
    });
  }

  toggleCardLike(cardId, isLiked) {
    let method = "";
    if (isLiked) {
      method = "DELETE";
    } else {
      method = "PUT";
    }
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method,
        headers: {
          authorization: "675ffc74-7010-43d4-a4e4-01622ad8dbf1",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateProfilePicture(picLink) {
    const data = {
      avatar: picLink,
    };
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "675ffc74-7010-43d4-a4e4-01622ad8dbf1",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: %{res.status}`);
    });
  }

  loadInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "675ffc74-7010-43d4-a4e4-01622ad8dbf1",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  loadInitialProfileData() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "675ffc74-7010-43d4-a4e4-01622ad8dbf1",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((profileData) => {
        return profileData;
      });
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "675ffc74-7010-43d4-a4e4-01622ad8dbf1",
    "Content-Type": "application/json",
  },
});
