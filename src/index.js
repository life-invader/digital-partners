import moment from 'moment';
import './style.css';

const squares = document.querySelector('.squares');

const fetchData = async () => {
  const response = await fetch('https://dpg.gg/test/calendar.json');
  const data = await response.json();
  console.log(data);

  return data;
};

const columns = 51;
const days = 357;
const currentDate = new Date();

// for (var i = 1; i < 357; i++) {
//   const level = Math.floor(Math.random() * 3);
//   const li = createElementNode(`<li data-level="${level}"></li>`);
//   squares.append(li);
// }

async function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());
  const data = await fetchData(); // [2022-05-31, 3]

  // const dateForCompare = data[0]; // 31.05.2022
  // console.log(new Date(dateForCompare[0]).toLocaleDateString());

  const dates = [];

  while (date <= endDate) {
    const newData = new Date(date).toLocaleDateString(); // 26.10.2022
    const dateForCompare = splitString(newData); // 2022-05-31
    const item = Object.entries(data).find((element) => element[0] === dateForCompare);

    if (item) {
      // console.log(item);
    }

    dates.push(newData);
    date.setDate(date.getDate() + 1);

    const li = createElementNode(`<li data-level="${data[dateForCompare]}"></li>`);
    li.addEventListener('click', listener(item || newData));

    squares.append(li);
  }

  return dates;
}

const today = new Date();
const d1 = new Date(today.getTime() - 30758400000);
const d2 = today;

console.log(getDatesInRange(d1, d2));

// ================================================================

// const DAYS = () => {
//   const days = [];
//   const dateStart = moment().subtract(357 - 1, 'days');
//   const dateEnd = moment();

//   while (dateEnd.diff(dateStart, 'days') >= 0) {
//     days.push(dateStart.format('D'));
//     dateStart.add(1, 'days');
//   }
//   return days;
// };

// const availbableDays = DAYS();
// console.log(availbableDays);

// ==============================================================

// for (var i = 1; i < 365; i++) {
//   const level = Math.floor(Math.random() * 3);
//   squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
// }

// Event listener
function listener(data) {
  return function (evt) {
    console.log(data);
  };
}

// Utils
function createElementNode(string) {
  const div = document.createElement('div');
  div.innerHTML = string;
  return div.firstElementChild;
}

function splitString(dateString) {
  // Вход - 26.10.2022
  // Выход - 2022-05-31

  const date = dateString.split('.'); // [26, 10, 2022]
  return date.reverse().join('-');
}
