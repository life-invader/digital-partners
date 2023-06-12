import { DAYS, MONTHS } from './constants';

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
