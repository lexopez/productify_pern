import { defineConfig } from "drizzle-kit";
import "@clerk/express";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.NODE_ENV === "production"
        ? process.env.PROD_DATABASE_URL!
        : process.env.DEV_DATABASE_URL!,
  },
  // Enforces strict mode to prevent accidental data-loss during push operations
  strict: true,
  verbose: true,
});
