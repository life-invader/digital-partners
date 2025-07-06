/**
 * Сервис для работы с данными
 * Отвечает за получение и обработку данных о вкладах
 */
export class DataService {
  apiUrl = process.env.API_URL || 'https://dpg.gg/test/calendar.json';

  /**
   * Получает данные о вкладах с сервера
   * @returns {Promise<Object>} Данные о вкладах
   */
  async fetchContributionData() {
    try {
      const response = await fetch(this.apiUrl);

      if (!response.ok) {
        throw new Error(`[DataService]: HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[DataService]: Ошибка при получении данных:', error);
      return {};
    }
  }
}
