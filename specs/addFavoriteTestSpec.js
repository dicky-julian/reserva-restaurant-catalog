/* eslint-disable import/named */
/* eslint-disable no-undef */
import { FavoriteButtonInitiator } from '../src/assets/scripts/views/components/button';
import {
  fetchAllFavorite, fetchFavoriteById, addFavorite, deleteFavorite,
} from '../src/assets/scripts/data/db/restaurant';

const idRestaurant = 'v5o3qrbrwekfaq8m8z';

describe('Liking A Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div class="button__container"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonElement: document.querySelector('.button__container'),
      restaurantData: {
        id: idRestaurant,
      },
    });

    expect(document.querySelector('[aria-label="add favorite"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonElement: document.querySelector('.button__container'),
      restaurantData: {
        id: idRestaurant,
      },
    });

    expect(document.querySelector('[aria-label="delete favorite"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonElement: document.querySelector('.button__container'),
      restaurantData: {
        id: idRestaurant,
      },
    });

    document.querySelector('.add__favorite').dispatchEvent(new Event('click'));
    const restaurantData = await fetchFavoriteById(idRestaurant);

    expect(restaurantData).toEqual({ id: idRestaurant });

    deleteFavorite(idRestaurant);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonElement: document.querySelector('.button__container'),
      restaurantData: {
        id: idRestaurant,
      },
    });

    await addFavorite({ id: idRestaurant });
    document.querySelector('.add__favorite').dispatchEvent(new Event('click'));
    const restaurantData = await fetchFavoriteById(idRestaurant);

    expect(restaurantData).toEqual({ id: idRestaurant });

    deleteFavorite(idRestaurant);
  });
});

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    document.body.innerHTML = '<div class="button__container"></div>';
    await addFavorite({ id: idRestaurant });
  });

  afterEach(async () => {
    await deleteFavorite(idRestaurant);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonElement: document.querySelector('.button__container'),
      restaurantData: {
        id: idRestaurant,
      },
    });

    expect(document.querySelector('[aria-label="delete favorite"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonElement: document.querySelector('.button__container'),
      restaurantData: {
        id: idRestaurant,
      },
    });

    expect(document.querySelector('[aria-label="add favorite"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonElement: document.querySelector('.button__container'),
      restaurantData: {
        id: idRestaurant,
      },
    });

    document.querySelector('[aria-label="delete favorite"]').dispatchEvent(new Event('click'));
    const restaurantData = await fetchAllFavorite(idRestaurant);

    expect(restaurantData).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonElement: document.querySelector('.button__container'),
      restaurantData: {
        id: idRestaurant,
      },
    });

    await deleteFavorite(idRestaurant);
    document.querySelector('[aria-label="delete favorite"]').dispatchEvent(new Event('click'));
    const restaurantData = await fetchAllFavorite(idRestaurant);

    expect(restaurantData).toEqual([]);
  });
});
