import { faker } from "@faker-js/faker";

export function createFakeComment(userId: string, productId: string) {
  return {
    content: faker.lorem.sentence(),

    userId,

    productId,
  };
}
