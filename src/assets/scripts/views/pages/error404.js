const Error404 = {
  async render() {
    return `
            <div id="main">
                <div class="information__container">
                    <img data-src="./images/bg-error-404.png" alt="page's not found image" class="lazyload"/>
                    <h3>Page not found</h3>
                </div>
            </div>
        `;
  },

  async afterRender() {
    return '';
  },
};

export default Error404;
