const checkElement = (selector) => new Promise((resolve) => {
  const waitEl = (count = 0) => {
    const el = document.querySelector(selector);

    if (el) {
      resolve(el);
    } else {
      setTimeout(() => {
        waitEl(selector, count);
      }, 100);
    }
  };
  waitEl(selector);
});

const checkMultiElement = (selector) => new Promise((resolve) => {
  const waitEl = (count = 0) => {
    const el = document.querySelectorAll(selector);

    if (el.length > 1) {
      resolve(el);
    } else {
      setTimeout(() => {
        waitEl(selector, count);
      }, 100);
    }
  };
  waitEl(selector);
});

export {
  checkElement,
  checkMultiElement,
};
