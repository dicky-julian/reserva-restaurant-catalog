import Home from '../views/pages/home.js';
import DetailRestaurant from '../views/pages/detail-restaurant.js';
import Favorite from '../views/pages/favorite.js';
import Error404 from '../views/pages/error404.js';


const routes = {
  '/': Home,
  '/restaurant/:id': DetailRestaurant,
  '/favorite': Favorite,
  '404': Error404
};

export default routes;