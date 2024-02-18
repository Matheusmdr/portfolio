import { type Config } from "drizzle-kit";

import { env } from "@/env.js";

// export default {
//   schema: "./src/server/db/schema.ts",
//   driver: "turso",
//   dbCredentials: {
//     url: env.DATABASE_URL,
//     authToken: env.DATABASE_AUTH_TOKEN,
//   },
//   tablesFilter: ["portfolio_*"],
// } satisfies Config;

export default {
  schema: "./src/server/db/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["portfolio_*"],
} satisfies Config;
