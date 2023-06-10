export const Api = 'https://dpg.gg/test/calendar.json';

export const fetchData = async () => {
  const response = await fetch(Api);
  const data = await response.json();

  return data;
};
