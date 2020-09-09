import { checkElement } from './element-helper';

const scrollToY = (y, duration = 0, element = document.scrollingElement) => {
  if (element.scrollTop === y) return;

  const cosParameter = (element.scrollTop - y) / 2;
  let scrollCount = 0;
  let oldTimestamp = null;

  function step(newTimestamp) {
    if (oldTimestamp !== null) {
      // if duration is 0 scrollCount will be Infinity
      scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
      if (scrollCount >= Math.PI) {
        const result = element.scrollTop === y;
        return result;
      }
      element.scrollTop = cosParameter + y + cosParameter * Math.cos(scrollCount);
    }
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
};

const scrollToElement = (element, duration = 0) => {
  const offset = Math.round(element.getBoundingClientRect().top);
  scrollToY(document.scrollingElement.scrollTop + offset, duration);
};

const handleScrollToElement = (element) => {
  checkElement(element).then((el) => {
    scrollToElement(el, 200);
  });
};

export {
  handleScrollToElement,
  scrollToElement,
};
