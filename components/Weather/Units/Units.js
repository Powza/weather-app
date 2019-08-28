const units = props => {
  let checkUnits = null;
  if (props.flags.units === "us") {
    checkUnits = "°F";
  } else if (props.flags.units === "si") {
    checkUnits = "°C";
  }

  return checkUnits;
};

export default units;
