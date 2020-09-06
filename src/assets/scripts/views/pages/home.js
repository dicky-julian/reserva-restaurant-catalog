import { fetchAllRestaurant } from '../../data/api/restaurant.js';
import { restaurantListItem } from '../components/listItem.js';

const Home = {
    async render() {
        return `
            <div id="home">
                <header>
                    <div>
                        <h1 class="text__roman text__thin text__primary" aria-label="The best place to kick off your day">The best place to kick off your day</h1>
                        <h6 class="text__thin">
                            Cheap, Locality, Seasonality and Accessibility restaurant in personal level just for you.
                        </h6>
                        <button class="bt bt__secondary" onclick="console.log('mangan')" tabindex="6">See Restaurant</button>
                    </div>
                    <div>
                        <div class="header__banner">
                            <img src="./images/product_icon_192.webp" alt="">
                            <img src="./images/product_icon_192.webp" alt="">
                            <span></span>
                            <img src="./images/food_cup_2.webp" alt="" class="banner__cup">
                            <img src="./images/food_cup_1.webp" alt="" class="banner__cup">
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
                    <img src="./images/ending_image.webp" alt="revire restaurant" />
                    <div>
                        <h2 class="text__roman text__thin text__primary">Want us to review your restaurant?</h2>
                        <h6>

                        </h6>
                        <h6 class="text__thin">
                            Your restaurant will be known, your culinary will be more famous and your business will grow.
                        </h6>
                        <button class="bt bt__secondary" onclick="window.location.href='mailto:dicky.ech@gmail.com'" tabindex="5">Contact Us</button>
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
    },

    async fetchPopularRestaurant(restaurants) {
        const popularRestaurantElement = document.querySelector('#section__popular .product__container');
        const popularRestaurants = [...restaurants]
            .sort((firstData, lastData) => lastData.rating - firstData.rating)
            .slice(1, 5);

        popularRestaurants.forEach(restaurant => {
            popularRestaurantElement.innerHTML += restaurantListItem(restaurant);
        });
    },

    async fetchNewRestaurant(restaurants) {
        const newRestaurantElement = document.querySelector('#section__new .product__container');
        const newRestaurants = restaurants
            .slice(restaurants.length - 4, restaurants.length);

        newRestaurants.forEach(restaurant => {
            newRestaurantElement.innerHTML += restaurantListItem(restaurant);
        });
    }
};

export default Home;