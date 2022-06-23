import ApiService from '@framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsApiService.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return (await ApiService.parseResponse(response));
  };

  deletePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  };

  addPoint = async (point) => {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(PointsApiService.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return (await ApiService.parseResponse(response));
  };

  static adaptToServer = ({
    basePrice,
    dateFrom,
    dateTo,
    isFavorite,
    ...point
  }) => ({
    ...point,
    'base_price': basePrice,
    'date_from': dateFrom instanceof Date ? dateFrom.toISOString() : null,
    'date_to': dateTo instanceof Date ? dateTo.toISOString() : null,
    'is_favorite': isFavorite,
  });
}

export default PointsApiService;
