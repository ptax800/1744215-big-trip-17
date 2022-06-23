import { render } from '@framework/render';

import PointsModel from '@model/points-model';
import DestinationsModel from '@model/destinations-model';
import OffersModel from '@model/offers-model';
import FilterModel from '@model/filter-model';

import InfoPresenter from '@presenter/info-presenter';
import FilterPresenter from '@presenter/filter-presenter';
import PointsPresenter from '@presenter/points-presenter';

import PointService from '@service/point-service';
import InfoService from '@service/info-service';
import PointsApiService from '@service/points-api-service';

import NewEventButtonView from '@view/new-event-button-view';

const AUTHORIZATION = 'Basic gdhth4545';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const mainElement = document.querySelector('.trip-main');
const eventsElement = document.querySelector( '.trip-events');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel(pointsApiService);
const destinationsModel = new DestinationsModel(pointsApiService);
const offersModel = new OffersModel(pointsApiService);
const filterModel = new FilterModel();

const pointService = new PointService(offersModel, destinationsModel);
const infoService = new InfoService(pointService);

const infoPresenter = new InfoPresenter(mainElement, pointsModel, infoService);
const filterPresenter = new FilterPresenter(mainElement, pointsModel, filterModel);
const pointsPresenter = new PointsPresenter(eventsElement, pointsModel, filterModel, pointService);

const newEventButtonView = new NewEventButtonView();

newEventButtonView.setClickHandler(() => {
  newEventButtonView.setDisabled(true);
  pointsPresenter.createPoint(() => {
    newEventButtonView.setDisabled(false);
  });
});

infoPresenter.init();
filterPresenter.init();
pointsPresenter.init();

render(newEventButtonView, mainElement);

Promise.all([
  destinationsModel.init(),
  offersModel.init(),
]).finally(() => {
  pointsModel.init();
});
