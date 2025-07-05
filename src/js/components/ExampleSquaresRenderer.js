import { ContributionCalculator } from '../services/ContributionCalculator.js';

/**
 * Класс для отображения примеров квадратов
 * Отвечает за создание и управление примерами квадратов вкладов
 */
export class ExampleSquaresRenderer {
  /**
   * @param {NodeList} exampleSquares - Коллекция примеров квадратов
   */
  constructor(exampleSquares) {
    this.exampleSquares = exampleSquares;
    this.attachedListeners = [];

    this.init();
  }

  /**
   * Инициализирует примеры квадратов
   */
  init() {
    this.attachEventListeners();
  }

  /**
   * Привязывает обработчики событий к примерам квадратов
   */
  attachEventListeners() {
    this.exampleSquares.forEach((square, index) => {
      const clickHandler = this.createClickHandler(square);
      square.addEventListener('click', clickHandler);
      this.attachedListeners.push({ element: square, handler: clickHandler });
    });
  }

  /**
   * Создает обработчик клика для примера квадрата
   * @param {HTMLElement} square - Элемент квадрата
   * @returns {Function} Обработчик клика
   */
  createClickHandler(square) {
    return () => {
      const colorLevel = parseInt(square.dataset.color) || 0;
      const contributionDescription = ContributionCalculator.getContributionDescription(colorLevel);
      this.showExampleTooltip(square, contributionDescription);
    };
  }

  /**
   * Показывает подсказку для примера квадрата
   * @param {HTMLElement} square - Элемент квадрата
   * @param {string} description - Описание уровня вкладов
   */
  showExampleTooltip(square, description) {
    // Здесь можно добавить логику отображения tooltip для примера
    console.log(`Пример квадрата: ${description} вкладов`);
  }
}
