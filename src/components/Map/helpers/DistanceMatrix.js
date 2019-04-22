export default class DistanceMatrix {
  // static geocoder = null;

  constructor() {
    this.distanceMatrix = new google.maps.DistanceMatrixService();
    this.params = {};
  }

  getDistance(params) {
    // if no params exit
    if (!params) {
      return;
    }
    // return if the required properties are not
    // present in the params object
    if (
      !(
        params?.origin?.longitude &&
        params?.origin?.latitude &&
        params?.destination?.longitude &&
        params?.destination?.latitude
      )
    ) {
      return;
    }
    // save our params to the class
    const { origin, destination, ...slicedParams } = params;
    this.params = {
      origins: [new google.maps.LatLng(origin.latitude, origin.longitude)],
      destinations: [new google.maps.LatLng(destination.latitude, destination.longitude)],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      ...slicedParams,
    };
    // build and return our Premise
    const response = new Promise(this.handleDistanceMatrixPromise.bind(this));
    return response;
  }

  handleDistanceMatrixPromise(resolve, reject) {
    this.distanceMatrix.getDistanceMatrix(this.params, (results, status) => {
      try {
        resolve(results.rows[0].elements[0]);
      } catch (err) {
        reject({
          distance: 'Could not get distance',
          duration: 'Could not get duration',
        });
      }
    });
  }
}
