import { ContributionCalculator } from '../services/ContributionCalculator.js';
import { DateService } from '../services/DateService.js';
import { DomUtils } from '../utils/DomUtils.js';

/**
 * Класс для представления квадрата вклада
 * Отвечает за создание и управление отдельным квадратом
 */
export class Square {
  /**
   * @param {number} contributionLevel - Уровень вкладов (0-4)
   * @param {Array} contributionData - Данные о вкладах [дата, количество]
   */
  constructor(contributionLevel = 0, contributionData = []) {
    this.contributionLevel = contributionLevel;
    this.contributionData = contributionData;
    this.element = null;
    this.tooltip = null;
  }

  /**
   * Создает DOM-элемент квадрата
   * @returns {HTMLLIElement} Элемент квадрата
   */
  createElement() {
    const squareElement = DomUtils.createElement('li', {
      'data-color': this.contributionLevel.toString(),
    });
    DomUtils.addClass(squareElement, 'square');

    this.element = squareElement;
    this.attachEventListeners();

    return squareElement;
  }

  /**
   * Привязывает обработчики событий к квадрату
   */
  attachEventListeners() {
    if (!this.element) return;

    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  /**
   * Обработчик клика по квадрату
   * @param {Event} event - Событие клика
   */
  handleClick(event) {
    this.showTooltip();
  }

  /**
   * Показывает подсказку с информацией о вкладах
   */
  showTooltip() {
    if (!this.element) return;

    const [date, count] = this.contributionData;
    const formattedDate = DateService.formatDateForDisplay(date);
    const description = ContributionCalculator.getContributionDescription(this.contributionLevel);

    // Здесь можно добавить логику отображения tooltip
    console.log(`Дата: ${formattedDate}, Вклады: ${count}, Уровень: ${description}`);
  }

  /**
   * Обновляет данные квадрата
   * @param {number} newLevel - Новый уровень вкладов
   * @param {Array} newData - Новые данные о вкладах
   */
  updateData(newLevel, newData) {
    this.contributionLevel = newLevel;
    this.contributionData = newData;

    if (this.element) {
      this.element.setAttribute('data-color', this.contributionLevel);
    }
  }

  /**
   * Удаляет квадрат из DOM
   */
  destroy() {
    DomUtils.removeElement(this.element);
    this.element = null;
  }
}
