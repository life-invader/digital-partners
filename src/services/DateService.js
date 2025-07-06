/**
 * Сервис для работы с датами
 * Отвечает за форматирование и обработку дат
 */
export class DateService {
  /**
   * Константы для месяцев
   */
  static get MONTHS() {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }

  /**
   * Константы для месяцев на русском языке
   */
  static get LOCAL_MONTHS() {
    return [
      'Янв.',
      'Фев.',
      'Март',
      'Апр.',
      'Май',
      'Июнь',
      'Июль',
      'Авг.',
      'Сент.',
      'Окт.',
      'Нояб.',
      'Дек.',
    ];
  }

  /**
   * Константы для дней недели
   */
  static get DAYS() {
    return ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Wednesday', 'Friday', 'Saturday'];
  }

  /**
   * Преобразует дату в строку формата YYYY-MM-DD
   * @param {Date} date - Дата для преобразования
   * @returns {string} Дата в формате YYYY-MM-DD
   */
  static formatDateToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Преобразует строку даты в формат YYYY-MM-DD
   * @param {string} dateString - Строка даты в формате DD.MM.YYYY
   * @returns {string} Дата в формате YYYY-MM-DD
   */
  static splitAndFormatDate(dateString) {
    const dateParts = dateString.split('.');
    return dateParts.reverse().join('-');
  }

  /**
   * Форматирует дату для отображения
   * @param {string} dateString - Строка даты
   * @returns {string} Отформатированная дата
   */
  static formatDateForDisplay(dateString) {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = DateService.MONTHS[date.getMonth()];
    const day = date.getDate();
    const weekDay = DateService.DAYS[date.getDay()];

    return `${weekDay}, ${month} ${day}, ${year}`;
  }

  /**
   * Генерирует диапазон дат
   * @param {Date} startDate - Начальная дата
   * @param {Date} endDate - Конечная дата
   * @returns {Date[]} Массив дат в диапазоне
   */
  static generateDateRange(startDate, endDate) {
    const dates = [];
    const currentDate = new Date(startDate.getTime());

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate.getTime()));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
}
