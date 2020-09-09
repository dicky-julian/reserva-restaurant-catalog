import CONFIG from './config';

const apiEndpoint = {
  FETCH_ALL_RESTAURANT: `${CONFIG.BASE_URL}/list`,
  FETCH_DETAIL_RESTAURANT: (idRestaurant) => `${CONFIG.BASE_URL}/detail/${idRestaurant}`,
  ADD_REVIEW: `${CONFIG.BASE_URL}/review`,
};

export default apiEndpoint;
