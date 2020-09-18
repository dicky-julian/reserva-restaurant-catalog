import urlParser from '../../routes/url-parser';
import { fetchDetailRestaurant, addReview } from '../../data/api/restaurant';
import { fetchIdFavorite, addFavorite, deleteFavorite } from '../../data/db/restaurant';
import { menuListItem, reviewListItem } from '../components/listItem';
import { reviewFormItem } from '../components/formItem';
import { alert } from '../components/alert';
import { checkElement, checkMultiElement } from '../../utils/element-helper';
import { badge } from '../components/badge';
import CONFIG from '../../global/config';

const DetailRestaurant = {
  async render(dataRestaurant) {
    if (dataRestaurant) {
      const {
        name, description, address, city, pictureId, isAddedFavorite,
      } = dataRestaurant;

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
                            ${isAddedFavorite
    ? `
                                <div class="add__favorite" aria-label="delete favorite" role="button" tabindex="3">
                                    <img data-src="./images/icon-delete.webp" alt="icon delete" class="lazyload"/>
                                    <span class="text__danger text__bold">Remove from favorite</span>
                                </div>
                                `
    : `
                                <div class="add__favorite" aria-label="add favorite" role="button" tabindex="3">
                                    <img data-src="./images/icon-add.jpg" alt="icon add" class="lazyload"/>
                                    <span class="text__default">Add to favorite</span>
                                </div>
                            `
}
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
    return `
            <div class="loading__container">
                <img data-src="./images/loading-spinner.webp" alt="loading spinner" class="lazyload" />
            </div>
        `;
  },

  async afterRender() {
    const wrapper = document.querySelector('main');
    const url = urlParser.parseActiveUrlWithoutCombiner();
    const idRestaurant = url.id;
    const dataRestaurant = await fetchDetailRestaurant(idRestaurant);
    const dataIdFavorite = await fetchIdFavorite();
    const isAddedFavorite = dataIdFavorite.includes(idRestaurant);

    if (dataRestaurant) {
      const restaurantCategories = dataRestaurant.categories;
      const restaurantRatings = Math.floor(dataRestaurant.rating);
      const restaurantMenus = dataRestaurant.menus;
      const restaurantReviews = dataRestaurant.consumerReviews;

      dataRestaurant.isAddedFavorite = isAddedFavorite;
      // rerender page with restaurant's data
      wrapper.innerHTML = await this.render(dataRestaurant);

      this.renderCategories(restaurantCategories);
      this.renderRatings(restaurantRatings);
      this.renderMenus(restaurantMenus);
      this.renderReviews(restaurantReviews, idRestaurant);
      this.addFavoriteListener(dataRestaurant);
    }
  },

  async renderCategories(categories) {
    checkElement('.categories__container').then((el) => {
      categories.forEach((category) => {
        el.innerHTML += badge(category.name);
      });
    });
  },

  async renderRatings(ratings) {
    checkElement('.rating__container').then((el) => {
      const unChecklistRating = 5 - ratings;

      // eslint-disable-next-line no-plusplus
      for (let rating = 0; rating < ratings; rating++) {
        el.innerHTML += '<img data-src="./images/icon-star-add.jpg" alt="icon star rating" class="lazyload"/>';
      }

      for (let rating = 0; rating < unChecklistRating; rating++) {
        el.innerHTML += '<img data-src="./images/icon-star-remove.jpg" alt="icon star rating" class="lazyload"/>';
      }
    });
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
      });
    });
  },

  async renderReviews(reviews, idRestaurant) {
    checkElement('.review__container').then(() => {
      let reviewFieldIndex = 0;

      for (let reviewIndex = 0; reviewIndex < reviews.length; reviewIndex++) {
        const dataReview = reviews[reviewIndex];
        const { name, review, date } = dataReview;

        if (name && review && date) {
          if (reviewFieldIndex > 3) {
            reviewFieldIndex = 1;
          } else {
            ++reviewFieldIndex;
          }
          document.querySelector(`.review__field__${reviewFieldIndex}`).innerHTML += reviewListItem(dataReview);
        }
      }

      if (reviewFieldIndex > 3) {
        reviewFieldIndex = 1;
      } else {
        ++reviewFieldIndex;
      }
      document.querySelector(`.review__field__${reviewFieldIndex}`).innerHTML += reviewFormItem();
      document.querySelector('.form__review button').addEventListener('click', () => this.submitReviews(idRestaurant));
    });
  },

  async submitReviews(idRestaurant) {
    const reviewName = document.querySelector('.form__review input').value;
    const reviewMessage = document.querySelector('.form__review textarea').value;

    const dataReview = {
      id: idRestaurant,
      name: reviewName,
      review: reviewMessage,
    };

    await addReview(dataReview).then((response) => {
      if (response) {
        const reviewResult = response.customerReviews;
        checkMultiElement('.review__container > div').then((els) => {
          els.forEach((el) => el.innerHTML = '');
        });
        alert('Succesfully added review', 'success');
        this.renderReviews(reviewResult, idRestaurant);
      } else {
        alert('Failed when adding review', 'fail');
      }
    });
  },

  async addFavoriteListener(dataRestaurant) {
    checkElement('.add__favorite').then((buttonElement) => {
      buttonElement.addEventListener('click', () => this.handleDataFavorite(dataRestaurant, buttonElement));
    });
  },

  async handleDataFavorite(dataRestaurant, buttonElement) {
    const elementRole = buttonElement.getAttribute('aria-label');
    const isAddButton = elementRole === 'add favorite';
    const buttonImage = buttonElement.querySelector('img');

    buttonImage.src = './images/loading-spinner.webp';

    if (isAddButton) {
      await this.addDataFavorite(dataRestaurant, buttonElement);
    } else {
      await this.deleteDataFavorite(dataRestaurant, buttonElement);
    }
  },

  async addDataFavorite(dataRestaurant, buttonElement) {
    const buttonImage = buttonElement.querySelector('img');

    await addFavorite(dataRestaurant)
      .then(() => {
        buttonElement.setAttribute('aria-label', 'delete favorite');
        buttonImage.src = './images/icon-delete.webp';
        buttonElement.querySelector('span').remove();
        buttonElement.innerHTML += '<span class="text__danger text__bold">Remove from favorite</span>';
        alert('Succesfully added to favorite', 'success');
      })
      .catch((error) => {
        alert('Failed when adding favorite', 'fail');
        console.log(error);
      });
  },

  async deleteDataFavorite(dataRestaurant, buttonElement) {
    const idRestaurant = dataRestaurant.id;
    const buttonImage = buttonElement.querySelector('img');

    await deleteFavorite(idRestaurant)
      .then(() => {
        buttonElement.setAttribute('aria-label', 'add favorite');
        buttonImage.src = './images/icon-add.jpg';
        buttonElement.querySelector('span').remove();
        buttonElement.innerHTML += '<span class="text__default">Add to favorite</span>';
        alert('Succesfully removed from favorite', 'success');
      })
      .catch((error) => {
        alert('Failed when deleting favorite', 'fail');
        console.log(error);
      });
  },
};

export default DetailRestaurant;
