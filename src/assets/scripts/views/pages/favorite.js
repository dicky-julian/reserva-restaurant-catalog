import { fetchAllFavorite } from '../../data/db/restaurant.js';
import { restaurantListItem } from '../components/listItem.js';
import { checkElement } from '../../utils/element-helper.js';

const Favorite = {
    async render() {
        return `
            <div id="favorite">
                <h2 class="text__roman text__thin text__primary">Favorite Place</h2>
                <div class="product__container"></div>
                <div class="information__container">
                    <img src="./images/not-found.webp" />
                </div>
            </div>
        `;
    },

    async afterRender() {
        const dataRestaurant = await fetchAllFavorite();

        if (dataRestaurant.length) {
            checkElement('.information__container').then(el => {
                el.remove();
            });

            checkElement('#favorite .product__container').then(el => {
                dataRestaurant.forEach(restaurant => {
                    el.innerHTML += restaurantListItem(restaurant);
                })
            });
        }
    }
};

export default Favorite;