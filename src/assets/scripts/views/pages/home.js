// import TheMovieDbSource from '../../data/themoviedb-source';
// import { createMovieItemTemplate } from '../templates/template-creator';

const Home = {
    async render() {
        return `
        <div id='home'>
            <header>
                <div>
                    <h1 class="text__roman text__thin text__primary" aria-label="The best place to kick off your day">The best place to kick off your day</h1>
                    <h6 class="text__thin">
                        Cheap, Locality, Seasonality and Accessibility restaurant in personal level just for you.
                    </h6>
                    <button class="bt bt__secondary" onclick="window.location.href='#section__recommendation'" tabindex="6">See Restaurant</button>
                </div>
                <div>
                    <div class="header__banner">
                        <img src="./images/product_icon_192.png" alt="">
                        <img src="./images/product_icon_192.png" alt="">
                        <span></span>
                        <img src="./images/food_cup_2.png" alt="" class="banner__cup">
                        <img src="./images/food_cup_1.png" alt="" class="banner__cup">
                        <div></div>
                    </div>
                </div>
            </header>
            <div id='main'>
                <div id='section__recommendation'>
                    <h2 class="text__roman text__thin text__primary">Recommended Place</h2>
                    <div class="product__container"></div>
                </div>

                <div id='section__promotion'>
                    <h2 class="text__roman text__thin text__primary">Promoted Place</h2>
                    <div class="product__container"></div>
                </div>
            </div>
            <div id="section__ending">
                <img src='./images/ending_image.jpg' alt="" />
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
        // const movies = await TheMovieDbSource.nowPlayingMovies();
        // const moviesContainer = document.querySelector('#movies');
        // movies.forEach((movie) => {
        //     moviesContainer.innerHTML += createMovieItemTemplate(movie);
        // });
    },
};

export default Home;