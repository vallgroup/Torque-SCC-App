export default class NearbySearch {
  constructor(map) {
    // prettier-ignore
    if (!this.placesServices && google?.maps?.places?.PlacesService) { // eslint-disable-line
      this.placesServices = new google.maps.places.PlacesService(map);
    }

    this.params = {};
  }

  search(params) {
    if (!params) {
      return;
    }

    this.params = params;

    const response = new Promise(this.handleSearchPromise.bind(this));
    return response;
  }

  handleSearchPromise(resolve, reject) {
    // do search
    this.placesServices.nearbySearch(this.params, (results, status, pagination) => {
      // if 0 results
      if (status === 'ZERO_RESULTS') {
        resolve(results);
      }
      // if succesful resolve promise
      if (status === 'OK' && results.length > 0) {
        resolve(results);
      }
      // else, reject it
      reject(null);
    });
  }
}
