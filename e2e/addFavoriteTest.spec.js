/* eslint-disable no-await-in-loop */
/* eslint-disable indent */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Add Favorite Place');

Scenario('Liking one Restaurant', async (I) => {
    I.amOnPage('/');
    I.seeElement('.product');

    const firstRestaurant = locate('.product').first();
    const restaurantTitle = locate('.product h5').first();
    const firstRestaurantTitle = await I.grabTextFrom(restaurantTitle);
    I.click(firstRestaurant);

    I.seeElement('.add__favorite');
    I.click('.add__favorite');

    I.amOnPage('/#/favorite');
    I.seeElement('.product');
    const addedRestaurantTitle = await I.grabTextFrom('.product h5');

    assert.strictEqual(firstRestaurantTitle, addedRestaurantTitle);
});

Scenario('Searching Restaurant', async (I) => {
    I.amOnPage('/');
    I.seeElement('.product');

    const titles = [];

    for (let i = 1; i <= 3; i++) {
        I.click(locate('.product').at(i));
        I.seeElement('.add__favorite');
        I.click('.add__favorite');
        const addedRestaurantTitle = await I.grabTextFrom('#detail__restaurant h1');
        titles.push(addedRestaurantTitle);
        I.amOnPage('/');
    }

    I.amOnPage('/#/favorite');
    I.seeElement('.product');

    const searchQuery = titles[1].substring(0, 5);
    const matchingRestaurant = titles.filter((name) => name.indexOf(searchQuery) !== -1);

    matchingRestaurant.forEach(async (name, index) => {
        const visibleTitle = await I.grabTextFrom(locate('.product h5').at(index + 1));
        assert.strictEqual(name, visibleTitle);
    });
});
