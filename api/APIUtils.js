// Get user position coordinates
export function getPosition() {
  const geolocationOptions = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 10000
  };
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, geolocationOptions);
  });
}

// Reverse geolocation
export function fetchLocation(latitude, longitude) {
  return fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${latitude}&lon=${longitude}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

export function ipInfo(ip) {
  return fetch(`/api/ipinfo/${ip}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

export function ipData(ip) {
  return fetch(`/api/ipdata/${ip}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

// Get weather from coordinates
export function fetchWeather(latitude, longitude) {
  return (
    fetch(`/api/darksky/${latitude},${longitude}`)
      // fetch("https://next.json-generator.com/api/json/get/41m_cc4lP") // Testing
      .then(response => response.json())
      .catch(error => console.error(error))
  );
}
