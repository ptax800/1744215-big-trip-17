import HeaderPresenter from './presenter/header-presenter';
import PointsPresenter from './presenter/points-presenter';

import PointsModel from './model/points-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';

import NewEventButtonView from './view/new-event-button-view';

import PointsApiService from './service/points-api-service';

import { render } from './framework/render';

const AUTHORIZATION = 'Basic 546464545645665fdhdfg';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const mainElement = document.querySelector('.trip-main');
const eventsContainerElement = document.querySelector( '.trip-events');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel(pointsApiService);
const destinationsModel = new DestinationsModel(pointsApiService);
const offersModel = new OffersModel(pointsApiService);

const headerPresenter = new HeaderPresenter();
const pointsPresenter = new PointsPresenter(pointsModel, destinationsModel, offersModel);

const newEventButtonView = new NewEventButtonView();

newEventButtonView.setClickHandler(() => {
  newEventButtonView.setDisabled(true);
  pointsPresenter.createPoint(() => {
    newEventButtonView.setDisabled(false);
  });
});


headerPresenter.init(mainElement);
pointsPresenter.init(eventsContainerElement);

render(newEventButtonView, mainElement);

Promise.all([
  destinationsModel.init(),
  offersModel.init(),
]).finally(() => {
  pointsModel.init();
});
