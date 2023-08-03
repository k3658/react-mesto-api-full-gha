class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _statusCheck(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      Authorization: `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders,
    }).then(this._statusCheck);
  }

  setUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._statusCheck);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._statusCheck);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders,
    }).then(this._statusCheck);
  }

  postNewCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders,
      body: JSON.stringify({
        name: item.title,
        link: item.link,
      }),
    }).then(this._statusCheck);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders,
    }).then(this._statusCheck);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders,
    }).then(this._statusCheck);
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders,
    }).then(this._statusCheck);
  }
}

const api = new Api({
  baseUrl: "https://api.mestokk36.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
