import CONFIG from '../../global/config';
import API_ENDPOINT from '../../global/api-endpoint';

const fetchAllRestaurant = (async () => {
  const result = await fetch(API_ENDPOINT.FETCH_ALL_RESTAURANT)
    .then((response) => response.json())
    .then((data) => data.restaurants)
    .catch((error) => {
      console.log(error);
      return false;
    });
  return result;
});

const fetchDetailRestaurant = (async (id) => {
  const result = await fetch(API_ENDPOINT.FETCH_DETAIL_RESTAURANT(id))
    .then((response) => response.json())
    .then((data) => data.restaurant)
    .catch((error) => {
      console.log(error);
      return false;
    });
  return result;
});

const addReview = (async (dataReview) => {
  const { id, name, review } = dataReview;

  if (!id || !name || !review) return false;

  const result = await fetch(API_ENDPOINT.ADD_REVIEW, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': CONFIG.API_KEY,
    },
    body: JSON.stringify(dataReview),
  })
    .then((response) => response.json())
    .then((data) => data).catch((error) => {
      console.log(error);
      return false;
    });
  return result;
});

export {
  fetchAllRestaurant,
  fetchDetailRestaurant,
  addReview,
};
