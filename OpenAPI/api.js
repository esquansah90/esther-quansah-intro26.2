const results = document.getElementById("results");

// Coordinates for Norcross, GA ############################################################
const latitude = 33.94;
const longitude = -84.21;

// Current Weather ###########################################################
document.getElementById("current").addEventListener("click", () => {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
  )
    .then((res) => res.json())
    .then((data) => {
      const w = data.current_weather;
      results.innerHTML = `
                <h2>Current Weather</h2>
                <p>Temperature: ${w.temperature}°C</p>
                <p>Wind Speed: ${w.windspeed} km/h</p>
                <p>Wind Direction: ${w.winddirection}°</p>
                <p>Weather Code: ${w.weathercode}</p>
            `;
    })
    .catch(() => (results.innerHTML = "<p>Error loading weather.</p>"));
});

//Hourly Weather ############################################################
document.getElementById("hourly").addEventListener("click", () => {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=auto`,
  )
    .then((res) => res.json())
    .then((data) => {
      const times = data.hourly.time.slice(0, 12);
      const temps = data.hourly.temperature_2m.slice(0, 12);

      let html = "<h2>Next 12 Hours</h2>";
      for (let i = 0; i < times.length; i++) {
        html += `<p>${times[i]} → ${temps[i]}°C</p>`;
      }

      results.innerHTML = html;
    })
    .catch(() => (results.innerHTML = "<p>Error loading weather.</p>"));
});

// Daily Weather ############################################################
document.getElementById("daily").addEventListener("click", () => {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
  )
    .then((res) => res.json())
    .then((data) => {
      const days = data.daily.time;
      const max = data.daily.temperature_2m_max;
      const min = data.daily.temperature_2m_min;

      let html = "<h2>7‑Day Forecast</h2>";
      for (let i = 0; i < days.length; i++) {
        html += `<p><strong>${days[i]}</strong>: High ${max[i]}°C, Low ${min[i]}°C</p>`;
      }

      results.innerHTML = html;
    })
    .catch(() => (results.innerHTML = "<p>Error loading weather.</p>"));
});
