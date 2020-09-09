import Home from '../views/pages/home';
import DetailRestaurant from '../views/pages/detail-restaurant';
import Favorite from '../views/pages/favorite';
import Error404 from '../views/pages/error404';

const routes = {
  '/': Home,
  '/restaurant/:id': DetailRestaurant,
  '/favorite': Favorite,
  404: Error404,
};

export default routes;
