import { fetchData } from './js/api';
import { createSquare, renderExampleSquares } from './js/square';
import { renderMonths, splitString } from './js/utils';
import './style.css';

const squares = document.querySelector('.squares'); // squares container

async function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());
  const data = await fetchData();

  while (date <= endDate) {
    const newData = new Date(date).toLocaleDateString();
    const dateForCompare = splitString(newData);
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

    const li = createSquare(color, item || [dateForCompare, 0]);
    squares.append(li);
  }
}

// Запуск
const today = new Date();
const d1 = new Date(today.getTime() - 30758400000);
const d2 = today;
getDatesInRange(d1, d2);

renderExampleSquares();
renderMonths();
