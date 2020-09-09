import dbPromise from './dbs';

const storeName = 'restaurant';

const fetchAllFavorite = (async () => (await dbPromise).getAll(storeName));

const fetchIdFavorite = (async () => {
  const dataIdFavorite = [];
  const dataRestaurant = await fetchAllFavorite();
  dataRestaurant.forEach((restaurant) => {
    dataIdFavorite.push(restaurant.id);
  });
  return dataIdFavorite;
});

const addFavorite = (async (restaurant) => (await dbPromise).put(storeName, restaurant));

const deleteFavorite = (async (idRestaurant) => (await dbPromise).delete(storeName, idRestaurant));

export {
  fetchAllFavorite,
  fetchIdFavorite,
  addFavorite,
  deleteFavorite,
};
