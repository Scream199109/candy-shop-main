import {faker} from '@faker-js/faker';
import {PrismaClient, Product} from '@prisma/client';
import * as dotenv from 'dotenv';

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) * min)
}


dotenv.config();
const prisma = new PrismaClient();


const createProduct = async (quantity: number) => {
  const products: Product[] = [];

  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName()
    const categoryName = faker.commerce.department()

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: faker.helpers.slugify(productName),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price({min: 10, max: 999}),
        images: Array.from({length: getRandomNumber(2, 6)}).map(() => faker.image.url()),
        category: {
          create: {
            name: categoryName,
            slug: faker.helpers.slugify(categoryName)
          }
        },
        reviews: {
          create: [
            {
              rating: getRandomNumber(1, 5),
              text: faker.lorem.paragraph(),
              user: {
                connect: {id: 3}
              }
            },
            {
              rating: getRandomNumber(1, 5),
              text: faker.lorem.paragraph(),
              user: {
                connect: {id: 3}
              }
            }
          ]
        }
      }
    })
    products.push(product)
  }

  console.log(`Created ${products.length} products`)
}


async function main() {
  console.log('Start seeding ...')
  await createProduct(10)
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
