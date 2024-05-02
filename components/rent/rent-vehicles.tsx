"use client";
import { fetchVehicles } from "@/lib/utils";
import { ICar } from "@/types/car";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useRent } from "@/context/rent-context";
import { twMerge } from "tailwind-merge";

interface RentVehiclesProps {}

const RentVehicles = ({}: RentVehiclesProps) => {
  const [vehicles, setVehicles] = useState<Array<ICar>>([]);
  const { car: selectedCar, handleSetCar } = useRent();

  useEffect(() => {
    fetchVehicles().then((res) => {
      setVehicles(res.vehicles);
    });
  }, []);

  function selectCar(car: ICar) {
    if (!car.available) return;
    handleSetCar(car);
  }

  return (
    <div className="flex flex-col gap-8 flex-1 xl:mr-8" style={{ marginTop: "120px" }}>
      <h1 className="text-3xl font-bold text-white">
        Time to choose your car!
      </h1>
      <div className="grid gap-8 grid-cols-2 xl:grid-cols-3">
        {vehicles.map((car) => (
          <Card
            className={twMerge(
              "space-y-4 group",
              car === selectedCar && "!border-primary",
              car.available && "hover:border-primary/50 cursor-pointer",
              !car.available && "opacity-25"
            )}
            key={car.id}
            onClick={() => selectCar(car)}
          >
            <div className="relative aspect-video">
              <Image
                src={`/cars/${car.slug}.png`}
                alt=""
                fill
                className={twMerge(
                  "object-contain p-4 transition-[padding] border-b",
                  car.available && "group-hover:p-2",
                  car === selectedCar && "!p-2"
                )}
              />
            </div>
            <CardContent className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">
                {car.manufacturer} {car.model}
              </h2>
              <span className="text-gray-500">
                € {car.rental_price.toFixed(2)}/day
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RentVehicles;