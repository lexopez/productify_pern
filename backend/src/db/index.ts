// Make sure to install the 'pg' package
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });

// import "dotenv/config";

// import postgres from "postgres";
// import { drizzle } from "drizzle-orm/postgres-js";

// const sql = postgres(process.env.DATABASE_URL!, {
//   max: 20,
// });

// export const db = drizzle(sql);
