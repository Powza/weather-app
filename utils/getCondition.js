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
