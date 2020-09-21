import { fetchAllRestaurant } from '../../data/api/restaurant';
import { restaurantListItem } from '../components/listItem';
import { handleScrollToElement } from '../../utils/scroll-helper';
import { checkElement } from '../../utils/element-helper';

const Home = {
  async render() {
    return `
            <div id="home">
                <header>
                    <div>
                        <h1 class="text__roman text__thin text__primary" aria-label="The best place to kick off your day">The best place to kick off your day</h1>
                        <h2 class="text__thin subtitle">
                            Cheap, Locality, Seasonality and Accessibility restaurant in personal level just for you.
                        </h2>
                        <button id="see__restaurant" class="bt bt__secondary" tabindex="5">See Restaurant</button>
                    </div>
                    <div>
                        <div class="header__banner">
                            <img src="./images/placeholder.gif" data-src="./product-icon-192.png" alt="reserva icon" class="lazyload">
                            <img src="./images/placeholder.gif" data-src="./product-icon-192.png" alt="reserva icon" class="lazyload">
                            <span></span>
                            <img 
                              srcset="./images/food_cup_2_500.webp 480w, ./images/food_cup_2.webp 800w"
                              sizes="(max-width: 600px) 480px, 800px"
                              src="./images/placeholder.gif" 
                              data-src="./images/food_cup_2.webp" 
                              alt="image cup of food" class="banner__cup lazyload"
                            >
                            <img 
                              srcset="./images/food_cup_1_500.webp 480w, ./images/food_cup_1.webp 800w"
                              sizes="(max-width: 600px) 480px, 800px"
                              src="./images/placeholder.gif" 
                              data-src="./images/food_cup_1.webp" 
                              alt="image cup of food" 
                              class="banner__cup lazyload"
                            >
                            <div></div>
                        </div>
                    </div>
                </header>
                <div id="main">
                    <div id="section__popular">
                        <h2 class="text__roman text__thin text__primary">Popular Place</h2>
                        <div class="product__container"></div>
                    </div>

                    <div id="section__new">
                        <h2 class="text__roman text__thin text__primary">New Place</h2>
                        <div class="product__container"></div>
                    </div>
                </div>
                <div id="section__ending">
                    <img src="./images/placeholder.gif" data-src="./images/ending_image.jpg" alt="revire restaurant" class="lazyload" />
                    <div>
                        <h2 class="text__roman text__thin text__primary">Want us to review your restaurant?</h2>
                        <h6 class="text__thin">
                            Your restaurant will be known, your culinary will be more famous and your business will grow.
                        </h6>
                        <button class="bt bt__secondary" onclick="window.location.href='mailto:dicky.ech@gmail.com'" tabindex="3">Contact Us</button>
                    </div>
                </div>
            </div>
        `;
  },

  async afterRender() {
    const listRestaurants = await fetchAllRestaurant();
    if (listRestaurants) {
      await this.fetchPopularRestaurant(listRestaurants);
      await this.fetchNewRestaurant(listRestaurants);
    }

    await this.setScrollListener('#see__restaurant', '#main');
  },

  async fetchPopularRestaurant(restaurants) {
    const popularRestaurantElement = document.querySelector('#section__popular .product__container');
    const popularRestaurants = [...restaurants]
      .sort((firstData, lastData) => lastData.rating - firstData.rating)
      .slice(1, 5);

    popularRestaurants.forEach((restaurant) => {
      popularRestaurantElement.innerHTML += restaurantListItem(restaurant);
    });
  },

  async fetchNewRestaurant(restaurants) {
    const newRestaurantElement = document.querySelector('#section__new .product__container');
    const newRestaurants = restaurants
      .slice(restaurants.length - 4, restaurants.length);

    newRestaurants.forEach((restaurant) => {
      newRestaurantElement.innerHTML += restaurantListItem(restaurant);
    });
  },

  async setScrollListener(elementFrom, elementTo) {
    checkElement(elementFrom).then((element) => {
      element.addEventListener('click', () => handleScrollToElement(elementTo));
    });
  },
};

export default Home;
