import { Square } from './Square.js';
import { ContributionCalculator } from '../services/ContributionCalculator.js';
import { DateService } from '../services/DateService.js';
import { DomUtils } from '../utils/DomUtils.js';

/**
 * Класс для управления сеткой календаря
 * Отвечает за создание и управление сеткой квадратов вкладов
 */
export class CalendarGrid {
  /**
   * @param {HTMLElement} container - Контейнер для сетки
   * @param {HTMLElement} monthsContainer - Контейнер месяцев
   */
  constructor(container, monthsContainer) {
    this.container = container;
    this.monthsContainer = monthsContainer;
    this.months = [];
    this.squares = [];
    this.dataService = null;
  }

  /**
   * Устанавливает сервис данных
   * @param {Object} dataService - Сервис для работы с данными
   */
  setDataService(dataService) {
    this.dataService = dataService;
  }

  /**
   * Создает сетку календаря для заданного диапазона дат
   * @param {Date} startDate - Начальная дата
   * @param {Date} endDate - Конечная дата
   * @param {Object} contributionData - Данные о вкладах
   */
  createGrid(startDate, endDate, contributionData = {}) {
    this.renderMonths();
    const dates = DateService.generateDateRange(startDate, endDate);

    for (const date of dates) {
      const dateString = DateService.formatDateToISO(date);
      const contributionInfo = this.dataService?.findDataForDate(contributionData, dateString);

      const contributionCount = contributionInfo ? contributionInfo[1] : 0;
      const contributionLevel =
        ContributionCalculator.calculateContributionLevel(contributionCount);

      const square = new Square(contributionLevel, [dateString, contributionCount]);
      const squareElement = square.createElement();

      this.container.appendChild(squareElement);
      this.squares.push(square);
    }
  }

  /**
   * Получает количество квадратов в сетке
   * @returns {number} Количество квадратов
   */
  getSquareCount() {
    return this.squares.length;
  }

  /**
   * Создает отображение месяцев
   * @param {number} monthsCount - Количество месяцев для отображения
   */
  renderMonths(monthsCount = 12) {
    for (let i = 0; i < monthsCount; i++) {
      const currentDate = new Date();
      const previousMonthTime = currentDate.setMonth(currentDate.getMonth() - i);
      const monthNumber = new Date(previousMonthTime).getMonth();

      const monthElement = this.createMonthElement(monthNumber);
      this.monthsContainer.prepend(monthElement);
      this.months.push(monthElement);
    }
  }

  /**
   * Создает элемент месяца
   * @param {number} monthNumber - Номер месяца (0-11)
   * @returns {HTMLLIElement} Элемент месяца
   */
  createMonthElement(monthNumber) {
    const monthElement = DomUtils.createElement('li', {}, DateService.LOCAL_MONTHS[monthNumber]);
    DomUtils.addClass(monthElement, 'month');

    return monthElement;
  }

  /**
   * Получает количество отображаемых месяцев
   * @returns {number} Количество месяцев
   */
  getMonthsCount() {
    return this.months.length;
  }
}
