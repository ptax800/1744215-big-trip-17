import HeaderPresenter from './presenter/header-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './render.js';
import EventFormView from './view/event-form-view.js';

const tripMain = document.querySelector( '.trip-main' );
// const tripFilters = tripMain.querySelector( '.trip-controls__filters' );
const headerContainerElement = document.querySelector('.page-header__container');
const eventsContainerElement = document.querySelector( '.trip-events' );

// const headerPresenter = new HeaderPresenter();
const headerPresenter = new HeaderPresenter();
const boardPresenter = new BoardPresenter();

// headerPresenter.init(headerContainerElement);
headerPresenter.init(headerContainerElement);
boardPresenter.init(eventsContainerElement);

const formContainer = document.querySelector('.trip-events__list');
render(new EventFormView(), formContainer);

// Критерии
// Б10. Название функции или метода содержит глагол

// Переименовать функции, которые создают шаблон: create + Template. Пример: createTemplate, createButtonTemplate

// Б27. Название модуля соответствует его содержимому
// Например, если в модуле лежит класс GameView, то и имя модуля должно быть game-view.js

// Переименовать классы или модули

// Б6. Классы названы английскими существительными

// CreateEventFormView -> EventFormView

// По заданию

// Доработать презентер headerPresenter
// Отрисовать вью, как в макете
