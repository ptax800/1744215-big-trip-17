class PointService {
  #offersModel = null;
  #destinationsModel = null;

  constructor(offersModel, destinationsModel) {
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  getOffersByType = (type) => this.#offersModel.offers[type] ?? {};

  getOffersByIds = (type, ids) => {
    const typeOffers = this.getOffersByType(type);
    return ids.map((id) => typeOffers[id]);
  };

  getDestinationByName = (name) => this.#destinationsModel.destinations
    .find((destination) => destination.name === name) ?? null;

  getDestinationNames = () => this.#destinationsModel.destinations
    .map(({ name }) => name);
}

export default PointService;
