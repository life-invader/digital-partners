import { createElementNode, formatDateString } from './utils';

let tooltip = null;

export const renderTooltip = (container, data) => {
  const contributions = data[1] ? data[1] : 'No';
  const date = formatDateString(data[0]);

  const node = createElementNode(
    `
    <div class='tooltip'>
      <p class='tooltip__text'>${contributions} contributions</>
      <p class='tooltip__date'>${date}</>
    </div>
    `,
  );

  closeTooltip(container);
  container.append(node);
  container.classList.add('squares__item--active');
  tooltip = node;
  document.body.addEventListener('click', tooltipBodyListener(container), { capture: true });

  return node;
};

export const closeTooltip = (container) => {
  container.classList.remove('squares__item--active');
  tooltip && tooltip.remove();
  tooltip = null;
  document.body.removeEventListener('click', tooltipBodyListener(container), { capture: true });
};

const tooltipBodyListener = (container) => (evt) => {
  if (evt.target.closest('.tooltip')) {
    return;
  }

  closeTooltip(container);
};
