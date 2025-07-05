import { DataService } from './services/DataService.js';
import { CalendarGrid } from './components/CalendarGrid.js';
import { ExampleSquaresRenderer } from './components/ExampleSquaresRenderer.js';

const DAYS_365_MS = 30758400000;

/**
 * Главный класс приложения календаря вкладов
 * Координирует работу всех компонентов
 */
export class CalendarApp {
  /**
   * @param {Object} config - Конфигурация приложения
   */
  constructor() {
    this.config = {
      monthsCount: 12,
    };

    this.dataService = new DataService();
    this.calendarGrid = null;
    this.exampleSquaresRenderer = null;
    this.contributionData = {};

    this.getDomElements();
    this.initialize();
  }

  getDomElements() {
    this.squaresContainer = document.querySelector('.squares');
    this.monthsContainer = document.querySelector('.months');
    this.exampleSquares = document.querySelectorAll('.examples__list .square');

    if (!this.squaresContainer || !this.monthsContainer) {
      throw new Error('[CalendarApp]: Не найдены необходимые DOM-элементы');
    }
  }

  /**
   * Инициализирует приложение
   * @param {HTMLElement} squaresContainer - Контейнер для квадратов
   * @param {HTMLElement} monthsContainer - Контейнер для месяцев
   * @param {NodeList} exampleSquares - Примеры квадратов
   */
  async initialize() {
    try {
      // Загрузка данных
      await this.loadContributionData();

      // Инициализация компонентов
      this.calendarGrid = new CalendarGrid(this.squaresContainer, this.monthsContainer);
      this.calendarGrid.setDataService(this.dataService);
      this.exampleSquaresRenderer = new ExampleSquaresRenderer(this.exampleSquares);

      // Создание календаря
      this.createCalendar();
      console.log('[CalendarApp]: Приложение календаря успешно инициализировано');
    } catch (error) {
      console.error('[CalendarApp]: Ошибка при инициализации приложения:', error);
    }
  }

  /**
   * Загружает данные о вкладах
   */
  async loadContributionData() {
    try {
      this.contributionData = await this.dataService.fetchContributionData();
    } catch (error) {
      console.error('[CalendarApp]: Ошибка при загрузке данных о вкладах:', error);
      this.contributionData = {};
    }
  }

  /**
   * Создает календарь
   */
  createCalendar() {
    const today = new Date();
    const startDate = new Date(today.getTime() - DAYS_365_MS); // 356 дней назад
    const endDate = today;

    this.calendarGrid.createGrid(startDate, endDate, this.contributionData);
  }

  /**
   * Получает статистику календаря
   * @returns {Object} Статистика календаря
   */
  getCalendarStats() {
    const totalSquares = this.calendarGrid.getSquareCount();
    const totalMonths = this.calendarGrid.getMonthsCount();

    return {
      totalSquares,
      totalMonths,
      hasData: Object.keys(this.contributionData).length > 0,
    };
  }
}
