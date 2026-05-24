import { db } from "../../index.ts";

import { comments, products, users } from "../../schema.ts";

import { ne } from "drizzle-orm";

export async function clearDatabase() {
  console.log("Clearing development data...");

  await db.delete(comments);

  await db.delete(products);

  // preserve bootstrap admin
  await db.delete(users).where(ne(users.email, "admin@example.com"));

  console.log("Database cleared");
}
