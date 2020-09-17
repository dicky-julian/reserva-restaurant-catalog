import { badge } from './badge';
import CONFIG from '../../global/config';

const restaurantListItem = ({
  id, name, description, city, rating, pictureId,
}) => `
    <a href="/#/restaurant/${id}" class="product" tabindex="4">
        <div class="product__img">
            <img src="./images/placeholder.gif" data-src="${CONFIG.BASE_IMAGE_URL}/${pictureId}" class="lazyload" alt="${name}" />
            <div class="product__rating">${rating}</div>
        </div>
        <div class="product__description">
            <h5 class="text__roman text__primary text__thin">${name}</h5>
            <h6 class="text__thin">${city}</h6>
            <h6 class="text__center text__thin">${description.slice(0, 90)}...</h6>
        </div>
    </a>
`;

const menuListItem = ({ name, type }) => `
    <div>
        <img src="./images/placeholder.gif" data-src="./images/bg-${type}-default.jpg" alt="default image ${type}" class="lazyload"/>
        <h6>${name}</h6>
        ${badge(type)}
    </div>  
`;

const reviewListItem = ({ name, review, date }) => `
    <div class="review">
        <div class="comment__container">
            <img src="./images/placeholder.gif" data-src="./images/icon-quote.webp" alt="quote icon" alt="icon quote" class="lazyload"/>
            <h5 class="text__thin">${review}</h5>
        </div>
        <div class="comment__info">
            <h6>${name}</h6>
            <span>${date}</span>
        </div>
    </div>
`;

export {
  restaurantListItem,
  menuListItem,
  reviewListItem,
};
