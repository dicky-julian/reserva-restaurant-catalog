import { fetchAllFavorite } from '../../data/db/restaurant.js';
import { restaurantListItem } from '../components/listItem.js';
import { checkElement } from '../../utils/element-helper.js';

const Favorite = {
    async render() {
        return `
            <div id="favorite">
                <h2 class="text__roman text__thin text__primary">Favorite Place</h2>
                <div class="product__container"></div>
                <div class="loading__container">
                    <img src="./images/loading-spinner.webp" alt="loading spinner" />
                </div>
            </div>
        `;
    },

    async afterRender() {
        const dataRestaurant = await fetchAllFavorite();

        checkElement('.loading__container').then(el => {
            el.remove();
        })
        
        if (dataRestaurant.length > 0) {
            checkElement('#favorite .product__container').then(el => {
                dataRestaurant.forEach(restaurant => {
                    el.innerHTML += restaurantListItem(restaurant);
                })
            });
            return;
        }

        checkElement('#favorite').then(el => {
            el.innerHTML = `
                <div class="information__container">
                    <img src="./images/not-found.webp" alt="image no data here" />
                </div>
            `;
            el.style.backgroundColor = '#fff'
        });
    }
};

export default Favorite;