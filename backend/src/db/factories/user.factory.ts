import { faker } from "@faker-js/faker";

export function createFakeUser() {
  return {
    id: faker.string.uuid(),

    email: faker.internet.email(),

    name: faker.person.fullName(),

    username: faker.internet.username(),

    imageUrl: faker.image.avatar(),
  };
}
