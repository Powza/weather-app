export function getDirection(angle) {
  var directions = ["N", "NW", "W", "SW", "S", "SE", "E", "NE"];
  return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
}
