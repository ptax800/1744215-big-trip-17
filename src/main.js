import HeaderPresenter from './presenter/header-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import EventFormView from './view/event-form-view.js';
import { render } from './render.js';


const tripMainElement = document.querySelector('.trip-main');
const eventsContainerElement = document.querySelector( '.trip-events' );

const headerPresenter = new HeaderPresenter();
const boardPresenter = new BoardPresenter();

headerPresenter.init(tripMainElement);
boardPresenter.init(eventsContainerElement);


