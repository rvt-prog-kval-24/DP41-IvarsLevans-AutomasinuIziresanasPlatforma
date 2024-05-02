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
    </div>
  );
};

export default RentCarPreviewer;
