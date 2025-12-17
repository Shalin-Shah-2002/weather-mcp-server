import { getCurrentWeather, getForecast } from "../services/weatherApi.js";
import { geocodeCity } from "../services/geocode.js";

export const weatherTools = [
  {
    name: "get_weather",
    description: "Get current weather for a city",
    inputSchema: {
      type: "object",
      properties: {
        city: { type: "string" },
      },
      required: ["city"],
    },
    handler: async ({ city }) => {
      const { latitude, longitude, name, country } = await geocodeCity(city);

      const weather = await getCurrentWeather(latitude, longitude);

      return {
        city: name,
        country,
        ...weather,
      };
    },
  },
  {
    name: "get_forecast",
    description: "Get multi-day weather forecast for a city",
    inputSchema: {
      type: "object",
      properties: {
        city: { type: "string" },
        days: { type: "number", default: 3 },
      },
      required: ["city"],
    },
    handler: async ({ city, days }) => {
      const { latitude, longitude, name, country } = await geocodeCity(city);

      const forecast = await getForecast(latitude, longitude, days);

      return {
        city: name,
        country,
        forecast,
      };
    },
  },
];
