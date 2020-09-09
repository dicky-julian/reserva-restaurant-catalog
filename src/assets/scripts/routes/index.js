import Home from '../views/pages/home';
import Restaurant from '../views/pages/restaurant';
import DetailRestaurant from '../views/pages/detail-restaurant';
import Favorite from '../views/pages/favorite';
import Error404 from '../views/pages/error404';

const routes = {
  '/': Home,
  '/restaurant': Restaurant,
  '/restaurant/:id': DetailRestaurant,
  '/favorite': Favorite,
  404: Error404,
};

export default routes;
