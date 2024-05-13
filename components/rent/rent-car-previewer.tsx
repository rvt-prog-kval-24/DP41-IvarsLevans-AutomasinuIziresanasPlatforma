"use client";
import { useRent } from "@/context/rent-context";
import Image from "next/image";
import React from "react";

const RentCarPreviewer = () => {
  const { car } = useRent();
  return (
    <div className="flex items-center justify-center xl:items-start xl:flex-col gap-4 w-full">
      <div className="space-y-1">
        <h1 className="text-xl font-bold">
          <span className="font-normal">{car?.manufacturer} </span>
          {car?.model}
        </h1>
        <h3 className="text-foreground/50">{car?.year}</h3>
      </div>
      <div className="relative aspect-video w-48 xl:w-full">
        <Image
          src={`/cars/${car?.slug}.png`}
          alt={`${car?.model}`}
          className="object-contain"
          fill
        />
      </div>
      <div>
        <h3 className="text-base font-bold flex-col">
            Details:
        </h3>
        <h3 className="text-base flex-col" style={{ margin: "0.2em 0" }}>
            {car?.category && car.category.charAt(0).toUpperCase() + car.category.slice(1)}
        </h3>
        <h3 className="text-base flex-col" style={{ margin: "0.2em 0" }}>
            {car?.transmission && car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}
        </h3>
        <h3 className="text-base flex-col" style={{ margin: "0.2em 0" }}>
            Highway kmpl: {car?.highway_kmpl}
        </h3>
        <h3 className="text-base flex-col" style={{ margin: "0.2em 0" }}>
            Kmpl: {car?.kmpl}
        </h3>
      </div>
    </div>
  );
};

export default RentCarPreviewer;
