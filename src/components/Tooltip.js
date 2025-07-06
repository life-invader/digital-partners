import { DomUtils } from '../utils/DomUtils';

const getTooltipMarkup = (contributionCount, date = '') => {
  return `
      <div class='tooltip'>
        <p class='tooltip__text'>${contributionCount} contributions</>
        ${date && `<p class='tooltip__date'>${date}</>`}
      </div>
      `;
};

export class Tooltip {
  static showTooltip(container, data) {
    const { contributionCount, date = '' } = data;

    const node = DomUtils.createElementFromString(getTooltipMarkup(contributionCount, date));
    container.append(node);

    return node;
  }
}
