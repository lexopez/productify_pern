import { faker } from "@faker-js/faker";

export function createFakeUser() {
  return {
    id: faker.string.uuid(),

    email: faker.internet.email(),

    name: faker.person.fullName(),

    imageUrl: faker.image.avatar(),
  };
}
