import { fetchAllFavorite } from '../../data/db/restaurant';
import { restaurantListItem } from '../components/listItem';
import { checkElement } from '../../utils/element-helper';

const Favorite = {
  async render() {
    return `
            <div id="favorite">
                <h2 class="text__roman text__thin text__primary">Favorite Place</h2>
                <div class="product__container"></div>
                <a class="loading__container">
                    <img data-src="./images/loading-spinner.webp" alt="loading spinner" class="lazyload" />
                </a>
            </div>
        `;
  },

  async afterRender() {
    const dataRestaurant = await fetchAllFavorite();

    checkElement('.loading__container').then((el) => {
      el.remove();
    });

    if (dataRestaurant.length > 0) {
      checkElement('#favorite .product__container').then((el) => {
        dataRestaurant.forEach((restaurant) => {
          el.innerHTML += restaurantListItem(restaurant);
        });
      });
      return;
    }

    checkElement('#favorite').then((el) => {
      el.innerHTML = `
                <div class="information__container">
                    <img data-src="./images/not-found.jpg" alt="image no data here" class="lazyload" />
                </div>
            `;
      el.style.backgroundColor = '#fff';
    });
  },
};

export default Favorite;
