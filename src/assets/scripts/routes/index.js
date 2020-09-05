import Home from '../views/pages/home.js';
import Restaurant from '../views/pages/restaurant.js';
import DetailRestaurant from '../views/pages/detail-restaurant.js';
import Favorite from '../views/pages/favorite.js';
import Error404 from '../views/pages/error404.js';


const routes = {
  '/': Home,
  '/restaurant': Restaurant,
  '/restaurant/:id': DetailRestaurant,
  '404': Error404
};

export default routes;