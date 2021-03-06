import urlParser from './assets/scripts/routes/url-parser';
import routes from './assets/scripts/routes';

class App {
  async renderPage() {
    const wrapper = document.querySelector('main');
    const url = urlParser.parseActiveUrlWithCombiner();
    const page = routes[url] || routes['404'];

    wrapper.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
