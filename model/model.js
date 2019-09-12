import { createStore, action } from "easy-peasy";

const weather = {
  weatherData: "",
  setWeatherData: action((state, weatherData) => {
    state.weatherData = weatherData;
  })
};

const location = {
  locationLatitude: "",
  locationLongitude: "",
  locationCity: "",
  locationState: "",

  setLocationLatitude: action((state, locationLatitude) => {
    state.locationLatitude = locationLatitude;
  }),
  setLocationLongitude: action((state, locationLongitude) => {
    state.locationLongitude = locationLongitude;
  }),
  setLocationCity: action((state, locationCity) => {
    state.locationCity = locationCity;
  }),
  setLocationState: action((state, locationState) => {
    state.locationState = locationState;
  })
};

const spinner = {
  spinner: false,
  setSpinner: action((state, spinner) => {
    state.spinner = spinner;
  })
};

const model = {
  weather,
  location,
  spinner
};

export default model;

export function initializeStore(initialState) {
  return createStore(model, initialState);
}
