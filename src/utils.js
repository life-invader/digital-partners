import { DAYS, LOCAL_MONTHS, MONTHS } from './constants';

const months = document.querySelector('.months');

export function createElementNode(string) {
  const div = document.createElement('div');
  div.innerHTML = string;
  return div.firstElementChild;
}

export function splitString(dateString) {
  const date = dateString.split('.');
  return date.reverse().join('-');
}

export function formatDateString(dateString) {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const weekDay = DAYS[date.getDay()];

  return `${weekDay}, ${month} ${day}, ${year}`;
}

export const renderMonths = () => {
  for (let i = 0; i < 12; i++) {
    const currDate = new Date();
    const prevMonthMSeconds = currDate.setMonth(currDate.getMonth() - i);
    const currMonthNumber = new Date(prevMonthMSeconds).getMonth();

    months.prepend(createElementNode(`<li>${LOCAL_MONTHS[currMonthNumber]}</li>`));
  }
};
