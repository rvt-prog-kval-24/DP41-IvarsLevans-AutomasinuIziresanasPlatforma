import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('test', 12)
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      password
    }
  })
  console.log({ user })

  const manufacturers = [
    'Abarth',
    'Alfa Romeo',
    'Alpine',
    'Aston Martin',
    'Audi',
    'BYD',
    'Bentley',
    'BMW',
    'Citroen',
    'Cupra',
    'DS',
    'Dacia',
    'Fiat',
    'Ford',
    'Genesis',
    'Honda',
    'Hyundai',
    'Infiniti',
    'Jaguar',
    'Jeep',
    'Kia',
    'Lamborghini',
    'Land Rover',
    'Lexus',
    'Lotus',
    'Maserati',
    'Mazda',
    'McLaren',
    'Mercedes',
    'MG',
    'Mini',
    'Mitsubishi',
    'Nissan',
    'ORA',
    'Peugeot',
    'Polestar',
    'Porsche',
    'Renault',
    'Rolls-Royce',
    'Seat',
    'Skoda',
    'Smart',
    'SsangYong',
    'Subaru',
    'Suzuki',
    'Tesla',
    'Toyota',
    'Vauxhall',
    'Volkswagen',
    'Volvo'
  ]

  for (const name of manufacturers) {
    const manufacturer = await prisma.manufacturer.create({
      data: {
        name
      }
    })
    console.log({ manufacturer })
  }
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
