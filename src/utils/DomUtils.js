/**
 * Утилитарный класс для работы с DOM
 * Предоставляет методы для создания и управления DOM-элементами
 */
export class DomUtils {
  /**
   * Создает DOM-элемент из HTML-строки
   * @param {string} htmlString - HTML-строка
   * @returns {HTMLElement} Созданный элемент
   */
  static createElementFromString(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstElementChild;
  }

  /**
   * Создает элемент с заданными атрибутами
   * @param {string} tagName - Имя тега
   * @param {Object} attributes - Атрибуты элемента
   * @param {string} textContent - Текстовое содержимое
   * @returns {HTMLElement} Созданный элемент
   */
  static createElement(tagName, attributes = {}, textContent = '') {
    const element = document.createElement(tagName);

    // Установка атрибутов
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    // Установка текстового содержимого
    if (textContent) {
      element.textContent = textContent;
    }

    return element;
  }

  /**
   * Добавляет классы к элементу
   * @param {HTMLElement} element - Элемент
   * @param {string|string[]} className - Имя класса или массив классов
   */
  static addClass(element, className) {
    if (Array.isArray(className)) {
      element.classList.add(...className);
    } else {
      element.classList.add(className);
    }
  }

  /**
   * Удаляет классы из элемента
   * @param {HTMLElement} element - Элемент
   * @param {string|string[]} className - Имя класса или массив классов
   */
  static removeClass(element, className) {
    if (Array.isArray(className)) {
      element.classList.remove(...className);
    } else {
      element.classList.remove(className);
    }
  }

  /**
   * Проверяет наличие класса у элемента
   * @param {HTMLElement} element - Элемент
   * @param {string} className - Имя класса
   * @returns {boolean} true, если класс присутствует
   */
  static hasClass(element, className) {
    return element.classList.contains(className);
  }

  /**
   * Переключает класс у элемента
   * @param {HTMLElement} element - Элемент
   * @param {string} className - Имя класса
   */
  static toggleClass(element, className) {
    element.classList.toggle(className);
  }

  /**
   * Устанавливает стили для элемента
   * @param {HTMLElement} element - Элемент
   * @param {Object} styles - Объект со стилями
   */
  static setStyles(element, styles) {
    Object.entries(styles).forEach(([property, value]) => {
      element.style[property] = value;
    });
  }

  /**
   * Безопасно удаляет элемент из DOM
   * @param {HTMLElement} element - Элемент для удаления
   */
  static removeElement(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  /**
   * Очищает содержимое элемента
   * @param {HTMLElement} element - Элемент для очистки
   */
  static clearElement(element) {
    if (element) {
      element.innerHTML = '';
    }
  }

  /**
   * Проверяет, существует ли элемент в DOM
   * @param {HTMLElement} element - Элемент для проверки
   * @returns {boolean} true, если элемент существует
   */
  static isElementInDOM(element) {
    return element && document.contains(element);
  }
}
