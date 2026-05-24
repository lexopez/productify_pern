import { comments } from "../../schema.ts";
import { createFakeComment } from "../../factories/comment.factory.ts";
import type { TX } from "./users.seed.ts";

type SeedUser = {
  id: string;
};

type SeedProduct = {
  id: string;
};

export async function seedComments(
  tx: TX,
  usersData: SeedUser[],
  productsData: SeedProduct[],
) {
  const commentsData = [];

  for (const product of productsData) {
    for (let i = 0; i < 5; i++) {
      const randomUser =
        usersData[Math.floor(Math.random() * usersData.length)];

      commentsData.push(createFakeComment(randomUser!.id, product.id));
    }
  }

  await tx.insert(comments).values(commentsData);

  console.log("Development comments seeded");
}
