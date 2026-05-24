import "dotenv/config";

import { db } from "../../index.ts";

import { users } from "../../schema.ts";

import { eq } from "drizzle-orm";

async function seedBootstrap() {
  console.log("Seeding bootstrap data...");

  await db.transaction(async (tx) => {
    const existingAdmin = await tx.query.users.findFirst({
      where: eq(users.email, "admin@example.com"),
    });

    if (!existingAdmin) {
      await tx.insert(users).values({
        id: "admin-user-id",

        email: "admin@example.com",

        name: "Administrator",

        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      });

      console.log("Admin created");
    } else {
      console.log("Admin already exists");
    }
  });

  console.log("Bootstrap seed complete");
}

seedBootstrap().catch(console.error);
