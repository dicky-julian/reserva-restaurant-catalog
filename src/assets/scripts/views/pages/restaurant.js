import { restaurantListItem } from '../components/listItem';
import { checkElement } from '../../utils/element-helper';
import { fetchAllRestaurant } from '../../data/api/restaurant';

const Favorite = {
  async render() {
    return `
            <div id="favorite">
                <h2 class="text__roman text__thin text__primary">Whatever you need.</h2>
                <div class="product__container"></div>
                <div class="loading__container">
                    <img src="./images/loading-spinner.webp" alt="loading spinner" />
                </div>
            </div>
        `;
  },

  async afterRender() {
    const listRestaurants = await fetchAllRestaurant();
    if (listRestaurants) {
      await this.fetchRestaurant(listRestaurants);
    }
  },

  async fetchRestaurant(restaurants) {
    checkElement('#favorite').then((el) => {
      const productContainer = el.querySelector('.product__container');
      const loadingContainer = el.querySelector('.loading__container');
      restaurants.forEach((restaurant) => {
        productContainer.innerHTML += restaurantListItem(restaurant);
      });
      loadingContainer.remove();
    });
  },
};

export default Favorite;
