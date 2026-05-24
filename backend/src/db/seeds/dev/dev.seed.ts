import "dotenv/config";

import { db } from "../../index.ts";
import { clearDatabase } from "../shared/clear-db.ts";
import { seedUsers } from "./users.seed.ts";
import { seedProducts } from "./products.seed.ts";
import { seedComments } from "./comments.seed.ts";

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Development seed blocked in production");
  }

  try {
    console.log("Development seeding started");

    await clearDatabase();

    await db.transaction(async (tx) => {
      const usersData = await seedUsers(tx);

      const productsData = await seedProducts(tx, usersData);

      await seedComments(tx, usersData, productsData);
    });

    console.log("Development seeding complete");
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

main();
