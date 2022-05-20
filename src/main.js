import HeaderPresenter from './presenter/header-presenter.js';
import PointPresenter from './presenter/point-presenter.js';

import PointModel from './model/point-model.js';

import { render } from './render.js';

const mainElement = document.querySelector('.trip-main');
const eventsContainerElement = document.querySelector( '.trip-events');

const pointModel = new PointModel();

const headerPresenter = new HeaderPresenter();
const pointPresenter = new PointPresenter(pointModel);

headerPresenter.init(mainElement);
pointPresenter.init(eventsContainerElement);