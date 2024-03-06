import { drizzle } from "drizzle-orm/libsql"
import { env } from "@/env.js";
import * as schema from "./schema";
import { createClient } from "@libsql/client";
// import { drizzle } from "drizzle-orm/better-sqlite3";
// import Database from "better-sqlite3";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

// const sqlite = new Database("sqlite.db");

export const db = drizzle(client, { schema });
