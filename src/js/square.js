import { renderTooltip } from './tooltip';
import { createElementNode } from './utils';

export const squareClickHandler = (container, data) => {
  return function (_evt) {
    renderTooltip(container, data);
  };
};

export const createSquare = (color = 0, data) => {
  const square = createElementNode(`<li class='squares__item' data-color="${color}"></li>`);
  square.addEventListener('click', squareClickHandler(square, data));

  return square;
};
