import 'regenerator-runtime';
import './assets/styles/main.css';
import './assets/styles/responsive.css';
import setNavbar from './assets/scripts/views/components/navbar.js';
import swRegister from './assets/scripts/utils/sw-register.js';
import App from './app.js';

const app = new App();

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  setNavbar();
});