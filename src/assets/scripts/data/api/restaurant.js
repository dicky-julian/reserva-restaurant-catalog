import CONFIG from '../../global/config.js';
import API_ENDPOINT from '../../global/api-endpoint.js';

const fetchAllRestaurant = (async () => {
    const data = await fetch(API_ENDPOINT.FETCH_ALL_RESTAURANT)
        .then((response) => response.json())
        .then((data) => {
            return data.restaurants;
        })
        .catch((error) => {
            console.log(error)
            return false;
        });
    return data;
});

const fetchDetailRestaurant = (async (id) => {
    const data = await fetch(API_ENDPOINT.FETCH_DETAIL_RESTAURANT(id))
        .then((response) => response.json())
        .then((data) => {
            return data.restaurant;
        })
        .catch((error) => {
            console.log(error)
            return false;
        });
    return data;
});

const addReview = (async (dataReview) => {
    const data = await fetch(API_ENDPOINT.ADD_REVIEW, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': CONFIG.API_KEY
        },
        body: JSON.stringify(dataReview)
    })
    .then((response) => response.json())
    .then((data) => {
        return data;
    }).catch((error) => {
        console.log(error)
        return false;
    });
    return data;
})

export {
    fetchAllRestaurant,
    fetchDetailRestaurant,
    addReview
}