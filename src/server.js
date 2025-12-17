import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { weatherTools } from "./tools/weather.js";
import { locationTools } from "./tools/location.js";

const server = new Server(
  {
    name: "weather-location-mcp",
    version: "1.0.0",
  },
  {
    tools: [...weatherTools, ...locationTools],
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
