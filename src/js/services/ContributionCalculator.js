/**
 * Сервис для расчета уровня вкладов
 * Отвечает за определение цвета квадрата на основе количества вкладов
 */
export class ContributionCalculator {
  /**
   * Пороги для определения уровня вкладов
   */
  static get CONTRIBUTION_THRESHOLDS() {
    return {
      HIGH: 30,
      MEDIUM: 20,
      LOW: 10,
      MINIMAL: 1,
    };
  }

  /**
   * Определяет уровень вкладов на основе количества
   * @param {number} contributionCount - Количество вкладов
   * @returns {number} Уровень вкладов (0-4)
   */
  static calculateContributionLevel(contributionCount) {
    const { HIGH, MEDIUM, LOW, MINIMAL } = ContributionCalculator.CONTRIBUTION_THRESHOLDS;

    if (contributionCount >= HIGH) return 4;
    if (contributionCount >= MEDIUM) return 3;
    if (contributionCount >= LOW) return 2;
    if (contributionCount >= MINIMAL) return 1;

    return 0;
  }

  /**
   * Получает описание уровня вкладов
   * @param {number} level - Уровень вкладов
   * @returns {string} Описание уровня
   */
  static getContributionDescription(level) {
    const descriptions = {
      0: 'No',
      1: '1-9',
      2: '10-19',
      3: '20-29',
      4: '30+',
    };

    return descriptions[level] || 'Unknown';
  }
}
