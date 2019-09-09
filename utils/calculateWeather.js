export function calculatePressure(pressure) {
  return parseFloat(pressure * 0.0295301).toFixed(2);
}

export function getDirection(angle) {
  var directions = ["N", "NW", "W", "SW", "S", "SE", "E", "NE"];
  return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
}

export function formatAsPercentage(x) {
  return `${Math.round(x * 100)} %`;
};

export function getCondition(condition) {
  switch (condition) {
    case "clear-day":
      return "Clear";
    case "clear-night":
      return "Clear";
    case "rain":
      return "Rain";
    case "snow":
      return "Snow";
    case "sleet":
      return "Sleet";
    case "wind":
      return "Wind";
    case "fog":
      return "Fog";
    case "cloudy":
      return "Cloudy";
    case "partly-cloudy-day":
      return "Partly Cloudy";
    case "partly-cloudy-night":
      return "Partly Cloudy";
    case "hail":
      return "Hail";
    case "thunderstorm":
      return "Thunderstorm";
    case "tornado":
      return "Tornado";
    default:
      console.log("Error: No Condition Set");
  }
}


