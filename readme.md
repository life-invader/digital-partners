# Календарь вкладов

Приложение для отображения календаря вкладов в стиле GitHub, переписанное с использованием принципов SOLID и ООП.

## Архитектура

Проект построен на принципах SOLID и объектно-ориентированного программирования:

### Принципы SOLID

1. **Single Responsibility Principle (SRP)** - каждый класс имеет одну ответственность
2. **Open/Closed Principle (OCP)** - классы открыты для расширения, закрыты для модификации
3. **Liskov Substitution Principle (LSP)** - подклассы могут заменять базовые классы
4. **Interface Segregation Principle (ISP)** - интерфейсы разделены на специфичные
5. **Dependency Inversion Principle (DIP)** - зависимости инвертированы

### Структура проекта

```
src/
├── js/
│   ├── services/           # Сервисы (бизнес-логика)
│   │   ├── DataService.js
│   │   ├── DateService.js
│   │   └── ContributionCalculator.js
│   ├── components/         # Компоненты UI
│   │   ├── Square.js
│   │   ├── CalendarGrid.js
│   │   ├── MonthsRenderer.js
│   │   └── ExampleSquaresRenderer.js
│   ├── utils/             # Утилиты
│   │   └── DomUtils.js
│   └── CalendarApp.js     # Главный класс приложения
├── index.js               # Точка входа
├── index.html
└── style.css
```

### Классы и их ответственности

#### Сервисы (Services)
- **DataService** - работа с API и данными
- **DateService** - форматирование и обработка дат
- **ContributionCalculator** - расчет уровней вкладов

#### Компоненты (Components)
- **Square** - отдельный квадрат вклада
- **CalendarGrid** - сетка календаря
- **MonthsRenderer** - отображение месяцев
- **ExampleSquaresRenderer** - примеры квадратов

#### Утилиты (Utils)
- **DomUtils** - работа с DOM

#### Главный класс
- **CalendarApp** - координация всех компонентов

## Преимущества новой архитектуры

1. **Модульность** - каждый класс отвечает за свою область
2. **Переиспользуемость** - компоненты можно использовать независимо
3. **Тестируемость** - каждый класс можно тестировать отдельно
4. **Расширяемость** - легко добавлять новые функции
5. **Читаемость** - код структурирован и понятен

## Запуск

```bash
npm install
npm start
```

## Использование

```javascript
import { CalendarApp } from './js/CalendarApp.js';

const app = new CalendarApp({
  apiUrl: 'https://dpg.gg/test/calendar.json',
  monthsCount: 12
});

await app.initialize(squaresContainer, monthsContainer, exampleSquares);
```