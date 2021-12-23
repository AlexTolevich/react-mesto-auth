const BASE_URL = 'https://auth.nomoreparties.co';

export const signup = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
        .then(_checkResponse);
};

export const signin = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
        .then(_checkResponse)
        .then(data => {
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('email', data.email);
            return data;
        });
};

export const checkToken = token => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
        }
    })
        .then(_checkResponse);
};

function _checkResponse(res) {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(res.status)
    }
}