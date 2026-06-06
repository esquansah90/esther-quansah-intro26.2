const results = document.getElementById("results");
const weatherIcon = document.getElementById("weatherIcon");

// Default background when website first opens
document.body.style.backgroundImage = "url('images/sky.jpg')";

// Default coordinates (Norcross, GA)
let latitude = 33.94;
let longitude = -84.21;

// Weather code descriptions
const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  95: "Thunderstorm",
};

// Background images for weather conditions
const weatherBackgrounds = {
  0: "images/sunny.jpg",
  1: "images/sunny.jpg",
  2: "images/cloudy.jpg",
  3: "images/cloudy.jpg",
  45: "images/fog.jpg",
  48: "images/fog.jpg",
  51: "images/rain.jpg",
  53: "images/rain.jpg",
  55: "images/rain.jpg",
  61: "images/rain.jpg",
  63: "images/rain.jpg",
  65: "images/rain.jpg",
  71: "images/snow.jpg",
  73: "images/snow.jpg",
  75: "images/snow.jpg",
  95: "images/storm.jpg",
};

// Fetch weather data with error handling
async function fetchWeather(url) {
  try {
    results.innerHTML = "<p class='loading'>Loading weather data...</p>";
    weatherIcon.innerHTML = "";

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    results.innerHTML = "<p class='error'>Error loading weather.</p>";
    console.error(error);
  }
}

// Get coordinates for a city
async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

  const data = await fetchWeather(url);
  if (!data || !data.results || data.results.length === 0) {
    results.innerHTML = "<p class='error'>City not found.</p>";
    return null;
  }

  return {
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude,
  };
}

// Search weather by city
document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    results.innerHTML = "<p class='error'>Please enter a city.</p>";
    return;
  }

  const coords = await getCoordinates(city);
  if (!coords) return;

  latitude = coords.latitude;
  longitude = coords.longitude;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const data = await fetchWeather(url);
  if (!data) return;

  const w = data.current_weather;

  // Updating Background based on weather code
  document.body.style.backgroundImage = `url('${weatherBackgrounds[w.weathercode]}')`;

  results.innerHTML = `
    <h2>Weather in ${city}</h2>
    <p><strong>Temperature:</strong> ${w.temperature}°C</p>
    <p><strong>Wind Speed:</strong> ${w.windspeed} km/h</p>
    <p><strong>Wind Direction:</strong> ${w.winddirection}°</p>
    <p><strong>Condition:</strong> ${weatherCodes[w.weathercode] || "Unknown"}</p>
  `;

  weatherIcon.innerHTML = "";
});

// Current Weather button
document.getElementById("current").addEventListener("click", async () => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const data = await fetchWeather(url);
  if (!data) return;

  const w = data.current_weather;

  // Updating Background based on weather code
  document.body.style.backgroundImage = `url('${weatherBackgrounds[w.weathercode]}')`;

  results.innerHTML = `
    <h2>Current Weather</h2>
    <p><strong>Temperature:</strong> ${w.temperature}°C</p>
    <p><strong>Wind Speed:</strong> ${w.windspeed} km/h</p>
    <p><strong>Wind Direction:</strong> ${w.winddirection}°</p>
    <p><strong>Condition:</strong> ${weatherCodes[w.weathercode] || "Unknown"}</p>
  `;

  weatherIcon.innerHTML = "";
});

// Hourly Weather
document.getElementById("hourly").addEventListener("click", async () => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=auto`;

  const data = await fetchWeather(url);
  if (!data) return;

  const times = data.hourly.time.slice(0, 12);
  const temps = data.hourly.temperature_2m.slice(0, 12);

  let html = "<h2>Next 12 Hours</h2>";
  for (let i = 0; i < times.length; i++) {
    html += `<p>${times[i]} → ${temps[i]}°C</p>`;
  }

  results.innerHTML = html;
  weatherIcon.innerHTML = "";
});

// Daily Weather
document.getElementById("daily").addEventListener("click", async () => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  const data = await fetchWeather(url);
  if (!data) return;

  const days = data.daily.time;
  const max = data.daily.temperature_2m_max;
  const min = data.daily.temperature_2m_min;

  let html = "<h2>7‑Day Forecast</h2>";
  for (let i = 0; i < days.length; i++) {
    html += `<p><strong>${days[i]}</strong>: High ${max[i]}°C, Low ${min[i]}°C</p>`;
  }

  results.innerHTML = html;
  weatherIcon.innerHTML = "";
});
