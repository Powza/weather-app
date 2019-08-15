import { createStore, action, thunk } from "easy-peasy";
import { convertRegion } from "../utils/stateNameAbbreviation";

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

const model = {
  weather,
  location
};

export default model;

export function initializeStore(initialState) {
  return createStore(model, initialState);
}
