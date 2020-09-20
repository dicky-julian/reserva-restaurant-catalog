/* eslint-disable import/named */
/* eslint-disable no-undef */
// import { addFavorite } from '../src/assets/scripts/data/db/restaurant';
import { addFavorite } from '../src/assets/scripts/data/db/restaurant';
import DetailRestaurant from '../src/assets/scripts/views/pages/detail-restaurant';

const createFavoriteButtonInitiator = async (restaurant) => {
  await DetailRestaurant.init({
    favoriteButtonContainer: document.querySelector('.add__favorite'),
    favoriteRestaurant: addFavorite,
    restaurant,
  });
};

describe('Liking A Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div class="add__favorite"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await createFavoriteButtonInitiator({ id: 1 });

    expect(document.querySelector('[aria-label="add favorite"]')).toBeFalsy();
  });
});
