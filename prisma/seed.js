require("dotenv").config();
const { PrismaClient } = require("@prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg")
const products = require("../data/products.json")

const sucursales = [
  {
    nombre: "Dulce Arte Centro",
    direccion: "Calle Principal 123, Centro",
    telefono: "+52 55 1234 5678",
    horario: "Lun-Dom 8:00 - 20:00",
    lat: 19.432608,
    lng: -99.133209,
    esPrincipal: true,
    order: 1,
    neighborhood: "Centro",
  },
  {
    nombre: "Dulce Arte Reforma",
    direccion: "Av. Reforma 456, Juárez",
    telefono: "+52 55 9876 5432",
    horario: "Lun-Sab 9:00 - 19:00",
    lat: 19.427020,
    lng: -99.167665,
    esPrincipal: false,
    order: 2,
    neighborhood: "Juárez",
  },
  {
    nombre: "Dulce Arte Polanco",
    direccion: "Presidente Masaryk 789, Polanco",
    telefono: "+52 55 2468 1357",
    horario: "Lun-Dom 9:00 - 21:00",
    lat: 19.434602,
    lng: -99.196095,
    esPrincipal: false,
    order: 3,
    neighborhood: "Polanco",
  },
]

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env")
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
})

async function main() {
  console.log(`Seeding ${products.length} products...`)

  await prisma.product.deleteMany()

  const data = products.map(({ id, ...rest }) => ({ ...rest }))

  await prisma.product.createMany({
    data,
    skipDuplicates: true,
  })

  console.log(`Seeded ${data.length} products successfully.`)

  console.log(`Seeding ${sucursales.length} sucursales...`)

  await prisma.sucursal.deleteMany()

  await prisma.sucursal.createMany({
    data: sucursales,
    skipDuplicates: true,
  })

  console.log(`Seeded ${sucursales.length} sucursales successfully.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
