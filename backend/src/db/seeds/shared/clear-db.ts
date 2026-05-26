import { db } from "../../index.js";

import { comments, products, users } from "../../schema.js";

import { ne } from "drizzle-orm";

export async function clearDatabase() {
  console.log("Clearing development data...");

  await db.delete(comments);

  await db.delete(products);

  // preserve bootstrap admin
  await db.delete(users).where(ne(users.email, "admin@example.com"));

  console.log("Database cleared");
}
