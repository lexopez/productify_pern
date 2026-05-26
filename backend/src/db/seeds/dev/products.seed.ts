import { products } from "../../schema.js";
import { createFakeProduct } from "../../factories/product.factory.js";
import type { TX } from "./users.seed.ts";

type SeedUser = {
  id: string;
};

export async function seedProducts(tx: TX, usersData: SeedUser[]) {
  const productsData = [];

  for (const user of usersData) {
    for (let i = 0; i < 3; i++) {
      productsData.push(createFakeProduct(user.id));
    }
  }

  const insertedProducts = await tx
    .insert(products)
    .values(productsData)
    .returning();

  console.log("Development products seeded");

  return insertedProducts;
}
