import { Api } from './js/constants';
import { createElementNode, formatDateString, splitString } from './js/utils';
import './style.css';

const squares = document.querySelector('.squares');

const fetchData = async () => {
  const response = await fetch(Api);
  const data = await response.json();

  return data;
};

async function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());
  const data = await fetchData(); // [2022-05-31, 3]

  while (date <= endDate) {
    const newData = new Date(date).toLocaleDateString(); // 26.10.2022
    const dateForCompare = splitString(newData); // 2022-05-31
    const item = Object.entries(data).find((element) => element[0] === dateForCompare);
    let color = 0;

    if (item) {
      switch (true) {
        case item[1] >= 30:
          color = 4;
          break;

        case item[1] >= 20:
          color = 3;
          break;

        case item[1] >= 10:
          color = 2;
          break;

        case item[1] >= 1:
          color = 1;
          break;

        default:
          color = 0;
      }
    }

    date.setDate(date.getDate() + 1);

    const li = createElementNode(`<li data-level="${color}"></li>`);
    li.addEventListener('click', listener({ data: item || [dateForCompare, 0], container: li }));

    squares.append(li);
  }
}

// Запуск
const today = new Date();
const d1 = new Date(today.getTime() - 30758400000);
const d2 = today;
getDatesInRange(d1, d2);

// Event listener
function listener(data) {
  return function (evt) {
    console.log(data);
    renderTooltip(data);
  };
}

function renderTooltip({ container, data }) {
  const tooltip = createElementNode(
    `
    <div class='tooltip'>
      <p>${data[1]} contributions</>
      <p>${formatDateString(data[0])}</>
    </div>
    `,
  );
  container.append(tooltip);
}
