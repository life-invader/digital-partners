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
  static eventNames = {
    show: 'tooltip:show',
    click: 'click',
  };

  selectors = {
    square: '.square',
  };

  constructor() {
    this.currentTooltip = {
      container: null,
      element: null,
    };
    this.init();
  }

  init() {
    document.addEventListener(Tooltip.eventNames.show, this.squareClickHandler);
    document.addEventListener(Tooltip.eventNames.click, this.documentClickHandler);
  }

  documentClickHandler = (evt) => {
    const { target } = evt;

    if (!target.closest(this.selectors.square)) {
      this.hideTooltip();
    }
  };

  squareClickHandler = (evt) => {
    const { target, detail } = evt;
    this.showTooltip(target, detail);
  };

  showTooltip(container, data) {
    if (this.currentTooltip.container === container) {
      return;
    }

    const { contributionCount, date = '' } = data;
    this.hideTooltip();

    const node = DomUtils.createElementFromString(getTooltipMarkup(contributionCount, date));
    container.append(node);
    this.saveTooltip({ container, element: node });

    return node;
  }

  hideTooltip() {
    const { element } = this.currentTooltip;
    element && element.remove();

    this.currentTooltip = {
      container: null,
      element: null,
    };
  }

  saveTooltip(cfg) {
    this.currentTooltip = {
      ...cfg,
    };
  }
}
