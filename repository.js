const API_KEY =
  'live_CmsGoJC8QA5sUuIGNwvZczVm8rp8Jql4MfmFiOAYbQsJYaZSgQvkPmm5CeSZAvdh';
const BASE_URL = 'https://api.thecatapi.com/';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

export const getCatImages = ({limit = 10, onSuccess, onFailure}) => {
  return fetch(BASE_URL + 'v1/images/search?limit=' + limit, {
    method: 'GET',
    headers: {...headers},
  })
    .then(response => response.json())
    .then(response => {
      onSuccess(response);
    })
    .catch(error => {
      onFailure(error);
    });
};

export const voteCat = ({image_id, onSuccess, onFailure}) => {
  return fetch(BASE_URL + 'v1/votes', {
    method: 'POST',
    headers: {...headers},
    body: {
      image_id: image_id,
      value: 1,
    },
  })
    .then(response => response.json())
    .then(response => {
      onSuccess(response);
    })
    .catch(error => {
      onFailure(error);
    });
};
