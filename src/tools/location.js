import axios from "axios";

export const locationTools = [
  {
    name: "detect_location_from_ip",
    description: "Detect approximate location using IP address",
    inputSchema: {
      type: "object",
      properties: {},
    },
    handler: async () => {
      const res = await axios.get("https://ipapi.co/json/");

      return {
        city: res.data.city,
        region: res.data.region,
        country: res.data.country_name,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
      };
    },
  },
];
