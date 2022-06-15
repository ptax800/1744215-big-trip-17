import HeaderPresenter from './presenter/header-presenter';
import PointsPresenter from './presenter/points-presenter';
import PointModel from './model/point-model';

import { render } from './framework/render';

const mainElement = document.querySelector('.trip-main');
const eventsContainerElement = document.querySelector( '.trip-events');

const pointModel = new PointModel();

const headerPresenter = new HeaderPresenter();
const pointsPresenter = new PointsPresenter(pointModel);

headerPresenter.init(mainElement);
pointsPresenter.init(eventsContainerElement);