import { ContributionCalculator } from '../services/ContributionCalculator.js';

/**
 * Класс для отображения примеров квадратов
 * Отвечает за создание и управление примерами квадратов вкладов
 */
export class ExampleSquaresRenderer {
  selectors = {
    exampleSquares: '.examples__list .square',
  };

  constructor() {
    this.exampleSquares = document.querySelectorAll(this.selectors.exampleSquares);
    this.attachEventListeners();
  }

  /**
   * Привязывает обработчики событий к примерам квадратов
   */
  attachEventListeners() {
    this.exampleSquares.forEach((square) => {
      square.addEventListener('click', this.squareClickHandler);
    });
  }

  squareClickHandler = (evt) => {
    const { currentTarget } = evt;

    const colorLevel = parseInt(currentTarget.dataset.color) || 0;
    const contributionDescription = ContributionCalculator.getContributionDescription(colorLevel);
    this.showExampleTooltip(currentTarget, contributionDescription);
  };

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
