import React from "react";
import VehicleCard from "./vehicle-card";
import { prisma } from "@/lib/prisma";

const Vehicles = async () => {
  // Fetch vehicles ordered by rental_price in descending order
  const vehicles = await prisma.car.findMany({
    orderBy: { rental_price: "desc" },
  });

  return (
    vehicles && (
      <section className="container px-6 pt-24 pb-12 mx-auto" id="vehicles">
        <div className="space-y-4">
          <div className="inline-block rounded-full bg-secondary px-3 py-1 text-sm">
            Available Models
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: "white" }}>
            Explore Our Selection
          </h2>
          <p className="max-w-[900px] md:text-xl lg:text-base xl:text-xl" style={{ color: "white" }}>
            Discover our diverse collection of vehicles, offering comfort, style, and performance.
          </p>
        </div>
        <div className="grid gap-8 py-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {vehicles.map((car) => (
            <VehicleCard car={car} key={car.id} />
          ))}
        </div>
      </section>
    )
  );
};

export default Vehicles;
