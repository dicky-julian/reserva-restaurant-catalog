import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import './assets/styles/main.css';
import './assets/styles/responsive.css';
import setNavbar from './assets/scripts/views/components/navbar';
import swRegister from './assets/scripts/utils/sw-register';
import App from './app';

const app = new App();

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  setNavbar();
});
