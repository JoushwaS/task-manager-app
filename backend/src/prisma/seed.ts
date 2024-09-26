import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Get the limit from the environment variable or default to 10
  const limit = parseInt(process.env.SEED_LIMIT) || 10;

  // Clear existing tasks (optional)
  await prisma.task.deleteMany({});

  // Create fake tasks
  const tasks = Array.from({ length: limit }, () => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(['pending', 'completed']),
    createdAt: new Date(),
  }));

  await prisma.task.createMany({ data: tasks });

  console.log(`${limit} tasks seeded successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
