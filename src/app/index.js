import { App } from './app';
import './style/index.css';

/**
 * Функция для запуска приложения
 */
async function startApp() {
  const app = new App();
  await app.initialize();

  window.calendarApp = app;
}

// Запуск приложения при загрузке DOM
document.addEventListener('DOMContentLoaded', startApp);
