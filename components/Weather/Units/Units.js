import { useStoreState } from "easy-peasy";

const units = props => {
  const weather = useStoreState(state => state.weather.weatherData);
  let checkUnits = null;

  if (weather && weather.flags.units === "us") {
    checkUnits = "°F";
  } else if (weather && weather.flags.units === "si") {
    checkUnits = "°C";
  }

  return <React.Fragment>{checkUnits}</React.Fragment>;
};

export default units;
