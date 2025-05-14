// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Show Current Location, Time, and Weather
function getLocationDetails() {
  const locationEl = document.getElementById("location");
  const timeEl = document.getElementById("time");
  const weatherEl = document.getElementById("weather");

  locationEl.innerText = "📍 Getting location...";

  if (!navigator.geolocation) {
    locationEl.innerText = "Geolocation not supported.";
    return;
  }

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;

    // 1. Reverse Geocoding
    const apiKey = "a3859f4386a0428c9f02299dac68bd18";
    const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();
    const components = geoData.results[0].components;
    const city = components.city || components.town || components.village;
    const country = components.country;

    locationEl.innerText = `🌍 You are in ${city}, ${country}`;

    // 2. Show Local Time
    const now = new Date();
    // timeEl.innerText = `⏰ Local time: ${now.toLocaleTimeString()}`;
    timeEl.innerText = `⏰ Local time: ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    // 3. Weather
    const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherRes = await fetch(weatherAPI);
    const weatherData = await weatherRes.json();
    const temp = weatherData.current_weather.temperature;
    const code = weatherData.current_weather.weathercode;

    weatherEl.innerText = `🌤️ Temperature: ${temp}°C`;
  }, () => {
    locationEl.innerText = "⚠️ Location access denied.";
  });
}
