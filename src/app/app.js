import { CalendarApp } from '../components/CalendarApp';

/**
 * Главная точка входа в приложение
 * Инициализирует и запускает календарь контрибьютов
 */
export class App {
  constructor() {
    this.calendarApp = null;
    this.isInitialized = false;
  }

  /**
   * Инициализирует приложение
   */
  async initialize() {
    try {
      this.calendarApp = new CalendarApp();
      this.isInitialized = true;

      console.log('[App]: Приложение успешно запущено');
    } catch (error) {
      console.error('[App]: Ошибка при инициализации приложения:', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Обрабатывает ошибки инициализации
   * @param {Error} error - Ошибка инициализации
   */
  handleInitializationError(error) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = 'Ошибка при загрузке календаря. Попробуйте обновить страницу.';
    errorMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ff6b6b;
      color: white;
      padding: 20px;
      border-radius: 8px;
      z-index: 1000;
      font-family: Arial, sans-serif;
    `;

    document.body.appendChild(errorMessage);

    // Удаление сообщения через 5 секунд
    setTimeout(() => {
      if (errorMessage.parentNode) {
        errorMessage.parentNode.removeChild(errorMessage);
      }
    }, 5000);
  }
}
