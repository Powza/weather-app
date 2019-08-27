export function getDirection(angle) {
  var directions = ["North", "North West", "West", "South West", "South", "South East", "East", "North East"];
  return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
}
