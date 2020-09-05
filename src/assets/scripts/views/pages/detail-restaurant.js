import urlParser from '../../routes/url-parser.js';
import { fetchDetailRestaurant, addReview } from '../../data/api/restaurant.js';
import { menuListItem, reviewListItem } from '../components/listItem.js';
import { reviewFormItem } from '../components/formItem.js';
import { checkElement, checkMultiElement } from '../../utils/element-helper.js';
import { badge } from '../components/badge.js';
import CONFIG from '../../global/config.js';

const DetailRestaurant = {
    async render(dataRestaurant) {

        if (dataRestaurant) {
            const { name, description, address, city, pictureId } = dataRestaurant;
            return `
                <div id="detail__restaurant">
                    <div id="section__information">
                        <div class="restaurant__picture">
                            <div class="img" style="background-image: url(${CONFIG.BASE_IMAGE_URL}/${pictureId})">
                                <div class="transparent__block"></div>
                            </div>
                        </div>
                        <div>
                            <h1 class="text__roman text__thin text__primary" aria-label="The best place to kick off your day">${name}</h1>
                            <h6 class="text__thin text__default">${address}, ${city}</h6>
                            <h6 class="text__thin text__justify">${description}</h6>
                            <div class="categories__container"></div>
                            <div class="rating__container"></div>
                            <div class="add__favorite">
                                <img src="./images/icon-add.png"/>
                                <span class="text__default">Add to favorite</span>
                            </div>
                        </div>
                    </div>
                    <div id="section__menu">
                        <h2 class="text__roman text__thin text__primary">Menus</h2>
                        <div class="menu__container"></div>
                    </div>
                    <div id="section__review">
                        <h2 class="text__roman text__thin text__primary">What people say about ${name}?</h2>
                        <div class="review__container">
                            <div class="review__field__1"></div>
                            <div class="review__field__2"></div>
                            <div class="review__field__3"></div>
                            <div class="review__field__4"></div>
                        </div>
                    </div>
                </div>
            `;
        }
        return '';
    },

    async afterRender() {
        const wrapper = document.querySelector('main');
        const url = urlParser.parseActiveUrlWithoutCombiner();
        const id_restaurant = url.id;
        const dataRestaurant = await fetchDetailRestaurant(id_restaurant);

        if (dataRestaurant) {
            const restaurantCategories = dataRestaurant.categories;
            const restaurantRatings = Math.floor(dataRestaurant.rating);
            const restaurantMenus = dataRestaurant.menus;
            const restaurantReviews = dataRestaurant.consumerReviews;
            // rerender page with restaurant's data
            wrapper.innerHTML = await this.render(dataRestaurant);

            this.renderCategories(restaurantCategories);
            this.renderRatings(restaurantRatings);
            this.renderMenus(restaurantMenus);
            this.renderReviews(restaurantReviews, id_restaurant);
        }
    },

    async renderCategories(categories) {
        checkElement('.categories__container').then((el) => {
            categories.forEach(category => {
                el.innerHTML += badge(category.name);
            });
        });
    },

    async renderRatings(ratings) {
        checkElement('.rating__container').then((el) => {
            const unChecklistRating = 5 - ratings;

            for (let rating = 0; rating < ratings; rating++) {
                el.innerHTML += '<img src="./images/icon-star-add.png" />'
            }

            for (let rating = 0; rating < unChecklistRating; rating++) {
                el.innerHTML += `<img src="./images/icon-star-remove.png" />`
            }
        })
    },

    async renderMenus({ foods, drinks }) {
        checkElement('.menu__container').then((el) => {
            foods.forEach((food) => {
                food.type = 'food';
                el.innerHTML += menuListItem(food);
            });

            drinks.forEach((drink) => {
                drink.type = 'drink';
                el.innerHTML += menuListItem(drink);
            })
        })
    },

    async renderReviews(reviews, id_restaurant) {
        console.log(reviews)
        checkElement('.review__container').then(() => {
            let reviewFieldIndex = 0;

            for (let reviewIndex = 0; reviewIndex < reviews.length; reviewIndex++) {
                const dataReview = reviews[reviewIndex];
                const { name, review, date } = dataReview;

                if (name && review && date) {
                    reviewFieldIndex > 3 ? reviewFieldIndex = 1 : ++reviewFieldIndex;
                    document.querySelector(`.review__field__${reviewFieldIndex}`).innerHTML += reviewListItem(dataReview);
                }
            }

            reviewFieldIndex > 3 ? reviewFieldIndex = 1 : ++reviewFieldIndex;
            document.querySelector(`.review__field__${reviewFieldIndex}`).innerHTML += reviewFormItem();
            return reviewFieldIndex;
        }).then((reviewFieldIndex) => {
            const reviewFormButton = document.querySelector('.form__review button');
            reviewFormButton.addEventListener('click', () => this.submitReviews(id_restaurant, reviewFieldIndex));
        })
    },

    async submitReviews(id_restaurant, reviewFieldIndex) {
        const reviewName = document.querySelector('.form__review input').value;
        const reviewMessage = document.querySelector('.form__review textarea').value;

        const dataReview = {
            id: id_restaurant,
            name: reviewName,
            review: reviewMessage
        }

        await addReview(dataReview).then((response) => {
            if (response) {
                console.log(response)
                const reviewResult = response.customerReviews;
                checkMultiElement('.review__container > div').then(els => {
                    els.forEach(el => el.innerHTML = '');
                });

                this.renderReviews(reviewResult, id_restaurant);
            }
        })
    }
};

export default DetailRestaurant;