/* eslint-disable no-empty-function */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { fetchFavoriteById, addFavorite, deleteFavorite } from '../../data/db/restaurant';
import { checkElement } from '../../utils/element-helper';
import { alert } from './alert';

const addedFavoriteButton = () => `
<div class="add__favorite" aria-label="delete favorite" role="button" tabindex="3">
    <img data-src="./images/icon-delete.webp" src="./images/placeholder.gif" alt="icon delete" class="lazyload"/>
    <span class="text__danger text__bold">Remove from favorite</span>
</div>
`;

const addFavoriteButton = () => `
<div class="add__favorite" aria-label="add favorite" role="button" tabindex="3">
    <img data-src="./images/icon-add.jpg" src="./images/placeholder.gif" alt="icon add" class="lazyload"/>
    <span class="text__default">Add to favorite</span>
</div>
`;

const FavoriteButtonInitiator = {
  async FavoriteButtonInitiator({ favoriteButtonElement, restaurantData }) {
    this._favoriteButtonContainer = favoriteButtonElement;
    this._restaurantData = restaurantData;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurantData;

    if (await this._isRestaurantExist(id)) {
      console.log('sudah');
      this._renderAdded();
    } else {
      console.log('belum');
      this._renderAdd();
    }
  },

  async _isRestaurantExist(id) {
    const restaurantData = await fetchFavoriteById(id);
    return restaurantData;
  },

  _renderAdd() {
    this._favoriteButtonContainer.innerHTML = addFavoriteButton();
    checkElement('.add__favorite').then((buttonElement) => {
      this._buttonElement = buttonElement;
      buttonElement.addEventListener('click', () => {
        buttonElement.querySelector('img').src = './images/loading-spinner.webp';
        this.addFavorite();
      });
    });
  },

  _renderAdded() {
    this._favoriteButtonContainer.innerHTML = addedFavoriteButton();
    checkElement('.add__favorite').then((buttonElement) => {
      this._buttonElement = buttonElement;
      buttonElement.addEventListener('click', () => {
        buttonElement.querySelector('img').src = './images/loading-spinner.webp';
        this.removeFavorite();
      });
    });
  },

  async addFavorite() {
    console.log('add favorite');
    await addFavorite(this._restaurantData)
      .then(() => {
        this._renderAdded();
        // const buttonElement = this._buttonElement;
        // buttonElement.setAttribute('aria-label', 'delete favorite');
        // buttonElement.querySelector('img').src = './images/icon-delete.webp';
        // buttonElement.querySelector('span').remove();
        // buttonElement.innerHTML += '<span class="text__danger text__bold">Remove from favorite</span>';
        alert('Succesfully added to favorite', 'success');
      })
      .catch((error) => {
        alert('Failed when adding favorite', 'fail');
        console.log(error);
      });
  },

  async removeFavorite() {
    console.log('remove favorite');
    const { id } = this._restaurantData;
    await deleteFavorite(id)
      .then(() => {
        this._renderAdd();
        // const buttonElement = this._buttonElement;
        // buttonElement.setAttribute('aria-label', 'add favorite');
        // buttonElement.querySelector('img').src = './images/icon-add.jpg';
        // buttonElement.querySelector('span').remove();
        // buttonElement.innerHTML += '<span class="text__default">Add to favorite</span>';
        alert('Succesfully removed from favorite', 'success');
      })
      .catch((error) => {
        alert('Failed when remove favorite', 'fail');
        console.log(error);
      });
  },

};

export {
  FavoriteButtonInitiator,
};
