import { badge } from './badge';
import CONFIG from '../../global/config';

const restaurantListItem = ({
  id, name, description, city, rating, pictureId,
}) => `
    <div class="product">
        <div class="product__img"
            role="img" 
            aria-label="${name}"
            style="background-image: url('${CONFIG.BASE_IMAGE_URL}/${pictureId}')">
            <div class="product__rating">${rating}</div>
        </div>
        <div class="product__description" onclick="window.location.href='/#/restaurant/${id}'">
            <h5 class="text__roman text__primary text__thin">${name}</h5>
            <h6 class="text__thin">${city}</h6>
            <h6 class="text__center text__thin">${description.slice(0, 90)}...</h6>
        </div>
    </div>
`;

const menuListItem = ({ name, type }) => `
    <div>
        <img src="./images/bg-${type}-default.webp" alt="default image ${type}"/>
        <h6>${name}</h6>
        ${badge(type)}
    </div>  
`;

const reviewListItem = ({ name, review, date }) => `
    <div class="review">
        <div class="comment__container">
            <img src="./images/icon-quote.webp" alt="quote icon" alt="icon quote" />
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
