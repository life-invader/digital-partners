import { ContributionNumber } from './constants';
import { renderExampleTooltip, renderTooltip } from './tooltip';
import { createElementNode } from './utils';

const exampleSquares = document.querySelectorAll('.examples__list .square');

export const squareClickHandler = (container, data) => {
  return function (_evt) {
    renderTooltip(container, data);
  };
};

export const createSquare = (color = 0, data) => {
  const square = createElementNode(`<li class='square' data-color="${color}"></li>`);
  square.addEventListener('click', squareClickHandler(square, data));

  return square;
};

export const renderExampleSquares = () => {
  exampleSquares.forEach((item) => {
    item.addEventListener('click', () => {
      const numberOfContributions = ContributionNumber[item.dataset.color];
      renderExampleTooltip(item, numberOfContributions);
    });
  });
};
