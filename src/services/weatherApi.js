import axios from "axios";
const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function getCurrentWeather(lat, lon) {
  const res = await axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current_weather: true,
    },
  });

  const data = res.data.current_weather;

  return {
    temperature_celsius: data.temperature,
    wind_speed_kmh: data.windspeed,
    wind_direction: data.winddirection,
    weather_code: data.weathercode,
  };
}

export async function getForecast(lat, lon, days = 3) {
  const res = await axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      daily: "temperature_2m_max,temperature_2m_min",
      forecast_days: days,
      timezone: "auto",
    },
  });

  return res.data.daily.time.map((date, index) => ({
    date,
    max_temp: res.data.daily.temperature_2m_max[index],
    min_temp: res.data.daily.temperature_2m_min[index],
  }));
}
