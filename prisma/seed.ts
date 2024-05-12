import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const dealerships = [
  {
    country: "Latvia",
    city: "Riga",
    address: "Brivibas iela 123",
    email: "email1@example.com",
    phone: "+371 12345678"
  },
  {
    country: "Latvia",
    city: "Riga",
    address: "Lacplesa iela 456",
    email: "email2@example.com",
    phone: "+371 24567890"
  },
];
const cars = [
  {
    kmpl: 13.5,
    highway_kmpl: 16.2,
    category: "subcompact",
    transmission: "manual",
    fuel_type: "flex",
    manufacturer: "Fiat",
    model: "Mobi",
    year: 2023,
    rental_factor: 0.86,
    slug: "fiat-mobi-2023",
  },
  {
    kmpl: 12.9,
    highway_kmpl: 15.7,
    category: "compact",
    transmission: "manual",
    fuel_type: "flex",
    manufacturer: "Chevrolet",
    model: "Onix",
    year: 2023,
    rental_factor: 1.07,
    slug: "chevrolet-onix-2023",
  },
  {
    kmpl: 14.2,
    highway_kmpl: 16.9,
    category: "subcompact",
    transmission: "manual",
    fuel_type: "flex",
    manufacturer: "Renault",
    model: "Kwid",
    year: 2022,
    rental_factor: 0.849,
    slug: "renault-kwid-2022",
  },
  {
    kmpl: 12.7,
    highway_kmpl: 15.0,
    category: "compact",
    transmission: "manual",
    fuel_type: "flex",
    manufacturer: "Toyota",
    model: "Etios",
    year: 2020,
    rental_factor: 1.041,
    slug: "toyota-etios-2020",
  },
  {
    kmpl: 12.3,
    highway_kmpl: 14.5,
    category: "compact",
    transmission: "manual",
    fuel_type: "flex",
    manufacturer: "Hyundai",
    model: "HB20",
    year: 2022,
    rental_factor: 1.12,
    slug: "hyundai-hb20-2022",
  },
  {
    kmpl: 12.6,
    highway_kmpl: 15.2,
    category: "sedan",
    transmission: "manual",
    fuel_type: "flex",
    manufacturer: "Nissan",
    model: "Versa",
    year: 2023,
    rental_factor: 1.23,
    slug: "nissan-versa-2023",
  },
  {
    kmpl: 12.8,
    highway_kmpl: 15.4,
    category: "compact",
    transmission: "manual",
    fuel_type: "flex",
    manufacturer: "Honda",
    model: "Fit",
    year: 2022,
    rental_factor: 1.34,
    slug: "honda-fit-2022",
  },
  {
    kmpl: 12.1,
    highway_kmpl: 14.2,
    category: "sedan",
    transmission: "automatic",
    fuel_type: "flex",
    manufacturer: "Chevrolet",
    model: "Cruze",
    year: 2023,
    rental_factor: 1.85,
    slug: "chevrolet-cruze-2023",
  },
  {
    kmpl: 11.9,
    highway_kmpl: 14.1,
    category: "sedan",
    transmission: "automatic",
    fuel_type: "flex",
    manufacturer: "Volkswagen",
    model: "Virtus",
    year: 2023,
    rental_factor: 1.76,
    slug: "volkswagen-virtus-2023",
  },
  {
    kmpl: 12.3,
    highway_kmpl: 14.6,
    category: "sedan",
    transmission: "automatic",
    fuel_type: "flex",
    manufacturer: "Toyota",
    model: "Corolla",
    year: 2023,
    rental_factor: 2.07,
    slug: "toyota-corolla-2023",
  },
  {
    kmpl: 8.7,
    highway_kmpl: 10.4,
    category: "pickup",
    transmission: "automatic",
    fuel_type: "diesel",
    manufacturer: "Ford",
    model: "Ranger",
    year: 2023,
    rental_factor: 3.08,
    slug: "ford-ranger-2023",
  },
  {
    kmpl: 10.2,
    highway_kmpl: 12.1,
    category: "SUV",
    transmission: "automatic",
    fuel_type: "flex",
    manufacturer: "Jeep",
    model: "Renegade",
    year: 2021,
    rental_factor: 2.29,
    slug: "jeep-renegade-2021",
  },
  {
    kmpl: 13.1,
    highway_kmpl: 15.5,
    category: "hatch",
    transmission: "manual",
    fuel_type: "gas",
    manufacturer: "Audi",
    model: "A3",
    year: 2022,
    rental_factor: 3.0,
    slug: "audi-a3-2022",
  },
  {
    kmpl: 11.8,
    highway_kmpl: 14.0,
    category: "sedan",
    transmission: "automatic",
    fuel_type: "gas",
    manufacturer: "BMW",
    model: "3 Series",
    year: 2021,
    rental_factor: 3.66,
    slug: "bmw-3-series-2021",
  },
];

async function main() {
  // Check if there are any existing rentals
  const existingRentals = await prisma.rental.count();
  
  // If there are no existing rentals, proceed with deleting and seeding data
  if (existingRentals === 0) {
    await prisma.dealership.deleteMany();
    await prisma.dealership.createMany({
      data: dealerships.map((dealership) => ({
        ...dealership,
      })),
    });
  
    await prisma.rental.deleteMany();
    await prisma.car.deleteMany();
    await prisma.car.createMany({
      data: cars.map((car) => ({ ...car, rental_price: 75 * car.rental_factor })),
    });
  } else {
    console.log("Skipping deletion because there are existing rentals.");
  }
}