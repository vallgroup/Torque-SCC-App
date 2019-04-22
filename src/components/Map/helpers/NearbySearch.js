export default class NearbySearch {
  // static geocoder = null;

  constructor(map, poiIcon) {
    if (!this.placesServices) {
      this.placesServices = new google.maps.places.PlacesService(map);
    }

    this.params = {};
    this.poiIcon = poiIcon;
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
        resolve([]);
      }
      // if succesful resolve promise
      if (status === 'OK' && results.length > 0) {
        resolve(this.formatResults(results));
      }
      // else, reject it
      reject([]);
    });
  }

  formatResults(results) {
    return results.map(result => ({
      icon: this.poiIcon || result.icon,
      latitude: result?.geometry?.location?.lat?.(),
      longitude: result?.geometry?.location?.lng?.(),
      name: result.name,
    }));
  }
}
