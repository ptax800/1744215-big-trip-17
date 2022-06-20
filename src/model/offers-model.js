class OffersModel {
  #pointsApiService = null;
  #offers = {};

  constructor(pointsApiService) {
    this.#pointsApiService = pointsApiService;
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      const offers = await this.#pointsApiService.offers;
      this.#offers = offers.reduce(OffersModel.adaptToClient, {});
    } catch(err) {
      this.#offers = {};
    }
  };

  static adaptToClient = (allOffers, { type, offers }) => {
    allOffers[type] = offers.reduce((typeOffers, offer) => {
      typeOffers[offer.id] = offer;
      return typeOffers;
    }, {});

    return allOffers;
  };
}

export default OffersModel;
