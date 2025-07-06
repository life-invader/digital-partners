import { ContributionCalculator } from '../services/ContributionCalculator.js';
import { DateService } from '../services/DateService.js';
import { DomUtils } from '../utils/DomUtils.js';
import { Tooltip } from './Tooltip.js';

/**
 * Класс для представления квадрата контрибьюта
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

    this.element = this.createElement();
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

  getElement() {
    return this.element;
  }

  /**
   * Привязывает обработчики событий к квадрату
   */
  attachEventListeners() {
    if (!this.element) return;

    this.element.addEventListener('click', this.handleClick);
  }

  /**
   * Обработчик клика по квадрату
   * @param {Event} event - Событие клика
   */
  handleClick = () => {
    this.showTooltip();
  };

  /**
   * Показывает подсказку с информацией о вкладах
   */
  showTooltip() {
    const [date] = this.contributionData;

    const formattedDate = DateService.formatDateForDisplay(date); // Прим.: Понедельник, December 16, 2024
    const contributionCount = ContributionCalculator.getContributionDescription(
      this.contributionLevel,
    );

    Tooltip.showTooltip(this.getElement(), { contributionCount, date: formattedDate });
  }
}
