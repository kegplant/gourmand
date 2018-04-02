export const ADD_LONG_LAT = "ADD_LONG_LAT";

export function addLongLat(latitude, longitude) {
  return {
    type: ADD_LONG_LAT,
    data: {
      latitude,
      longitude
    }
  };
}

export function handleGetGeolocation() {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(function(position) {
      const { latitude, longitude } = position.coords;
      localStorage.setItem("latitude", latitude);
      localStorage.setItem("longitude", longitude);
      dispatch(addLongLat(latitude, longitude));
    });
  };
}
