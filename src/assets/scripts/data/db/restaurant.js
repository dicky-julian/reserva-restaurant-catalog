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

const deleteFavorite = (async (id_restaurant) => {
    return (await dbPromise).delete(storeName, id_restaurant);
})

export {
    fetchAllFavorite,
    fetchIdFavorite,
    addFavorite,
    deleteFavorite
}