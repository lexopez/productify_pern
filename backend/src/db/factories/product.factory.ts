import { faker } from "@faker-js/faker";

export function createFakeProduct(userId: string) {
  return {
    title: faker.commerce.productName(),

    description: faker.commerce.productDescription(),

    price: Number(faker.commerce.price()),

    imageUrl: faker.image.urlPicsumPhotos(),

    userId,
  };
}
