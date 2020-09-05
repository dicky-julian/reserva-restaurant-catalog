import dbPromise from './dbs.js';

const storeName = 'restaurant';

const fetchAllFavorite = (async () => {
    return (await dbPromise).getAll(storeName);
});

const fetchIdFavorite = (async () => {
    const dataIdFavorite = [];
    const dataRestaurant = await fetchAllFavorite();
    dataRestaurant.forEach(restaurant => {
        dataIdFavorite.push(restaurant.id);
    });
    return dataIdFavorite;
})

const addFavorite = (async (restaurant) => {
    return (await dbPromise).put(storeName, restaurant);
});

export {
    fetchAllFavorite,
    fetchIdFavorite,
    addFavorite
}