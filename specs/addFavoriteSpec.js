/* eslint-disable no-undef */
// import { addFavorite } from '../src/assets/scripts/data/db/restaurant';
import AddFavoriteButton from '../src/assets/scripts/views/pages/detail-restaurant';

describe('Liking A Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div class="add__favorite"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the like button when the movie has not been liked before', async () => {
    await AddFavoriteButton.init({
      favoriteButtonContainer: document.querySelector('.add__favorite'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="add favorite"]')).toBeTruthy();
  });
});
