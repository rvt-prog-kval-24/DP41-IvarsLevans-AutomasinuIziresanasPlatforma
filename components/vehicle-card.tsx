"use client";
import { ICar } from "@/types/car";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRent } from "@/context/rent-context";
import { useRouter } from "next/navigation";

interface VehicleCardProps {
  car: ICar;
}

const VehicleCard = ({ car }: VehicleCardProps) => {
  const { handleSetCar } = useRent();
  const router = useRouter();
  return (
    <Card
      className="space-y-4 group"
      key={car.slug}
      onClick={() => {
        handleSetCar(car);
        router.push("/rent");
      }}
    >
      <div className="relative aspect-video">
        <Image
          src={`/cars/${car.slug}.png`}
          alt=""
          fill
          className="object-contain p-4 hover:p-2 transition-[padding] border-b"
        />
      </div>
      <CardContent>
        <h2 className="text-xl font-bold">
          {car.manufacturer} {car.model}
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            € {car.rental_price.toFixed(2)}
            /day
          </span>
          <Button asChild>
            <Link
              href="/rent"
              onClick={() => handleSetCar(car)}
              className="opacity-100 lg:opacity-0 transition-opacity group-hover:opacity-100"
            >
              Book
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;