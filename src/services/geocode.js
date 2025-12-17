import axios from "axios";

export async function geocodeCity(city) {
  const res = await axios.get(
    "https://geocoding-api.open-meteo.com/v1/search",
    {
      params: {
        name: city,
        count: 1,
      },
    }
  );

  if (!res.data.results || res.data.results.length === 0) {
    throw new Error("City not found");
  }

  const place = res.data.results[0];

  return {
    latitude: place.latitude,
    longitude: place.longitude,
    name: place.name,
    country: place.country,
  };
}
