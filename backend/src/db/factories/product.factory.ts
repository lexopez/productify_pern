import { faker } from "@faker-js/faker";

export function createFakeProduct(userId: string) {
  return {
    title: faker.commerce.productName(),

    description: faker.commerce.productDescription(),

    imageUrl: faker.image.urlPicsumPhotos(),

    userId,
  };
}
