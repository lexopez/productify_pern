import { createFakeUser } from "../../factories/user.factory.ts";
import { users } from "../../schema.ts";

export type TX = Parameters<
  Parameters<typeof import("../../index.ts").db.transaction>[0]
>[0];

export async function seedUsers(tx: TX) {
  const fakeUsers = Array.from({ length: 10 }, () => createFakeUser());

  const insertedUsers = await tx.insert(users).values(fakeUsers).returning();

  console.log("Development users seeded");

  return insertedUsers;
}
