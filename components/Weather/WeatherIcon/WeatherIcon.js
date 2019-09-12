const weatherIcon = props => {
  let icon = null;
  switch (props.condition) {
    case "clear-day":
      icon = <img src={`/static/weather/icons/${props.color}/svg/clear.svg`} alt={props.condition} />;
      break;
    case "clear-night":
      icon = <img src={`/static/weather/icons/${props.color}/svg/nt_clear.svg`} alt={props.condition} />;
      break;
    case "rain":
      icon = <img src={`/static/weather/icons/${props.color}/svg/rain.svg`} alt={props.condition} />;
      break;
    case "snow":
      icon = <img src={`/static/weather/icons/${props.color}/svg/snow.svg`} alt={props.condition} />;
      break;
    case "sleet":
      icon = <img src={`/static/weather/icons/${props.color}/svg/sleet.svg`} alt={props.condition} />;
      break;
    case "wind":
      icon = <img src={`/static/weather/icons/${props.color}/svg/wind.svg`} alt={props.condition} />;
      break;
    case "fog":
      icon = <img src={`/static/weather/icons/${props.color}/svg/fog.svg`} alt={props.condition} />;
      break;
    case "cloudy":
      icon = <img src={`/static/weather/icons/${props.color}/svg/cloudy.svg`} alt={props.condition} />;
      break;
    case "partly-cloudy-day":
      icon = <img src={`/static/weather/icons/${props.color}/svg/partlycloudy.svg`} alt={props.condition} />;
      break;
    case "partly-cloudy-night":
      icon = <img src={`/static/weather/icons/${props.color}/svg/nt_partlycloudy.svg`} alt={props.condition} />;
      break;
    case "hail":
      icon = <img src={`/static/weather/icons/${props.color}/svg/sleet.svg`} alt={props.condition} />;
      break;
    case "thunderstorm":
      icon = <img src={`/static/weather/icons/${props.color}/svg/tstorms.svg`} alt={props.condition} />;
      break;
    case "tornado":
      icon = <img src={`/static/weather/icons/${props.color}/svg/unknown.svg`} alt={props.condition} />;
      break;
    default:
      icon = <img src={`/static/weather/icons/${props.color}/svg/unknown.svg`} alt={props.condition} />;
      break;
  }
  return icon;
};

export default weatherIcon;
