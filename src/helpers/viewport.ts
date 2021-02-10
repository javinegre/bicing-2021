import { debounce } from 'lodash';

const calculateViewportHeightUnit: () => void = () => {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const initViewportHeightUnit: () => void = () => {
  // More info: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  calculateViewportHeightUnit();

  window.addEventListener('resize', debounce(calculateViewportHeightUnit, 400));
};

export default { initViewportHeightUnit };
