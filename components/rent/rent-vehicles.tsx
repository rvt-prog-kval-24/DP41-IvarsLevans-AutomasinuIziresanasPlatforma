"use client";
import { fetchVehicles } from "@/lib/utils";
import { ICar } from "@/types/car";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useRent } from "@/context/rent-context";
import { twMerge } from "tailwind-merge";

interface RentVehiclesProps {}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const RentVehicles = ({}: RentVehiclesProps) => {
  const [vehicles, setVehicles] = useState<Array<ICar>>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Array<ICar>>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [transmissions, setTransmissions] = useState<string[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");

  const { car: selectedCar, handleSetCar } = useRent();

  useEffect(() => {
    const loadVehicles = async () => {
      const vehicles = await fetchVehicles();
      setVehicles(vehicles.vehicles);

      // Extract unique manufacturers and sort them alphabetically
      const manufacturers = Array.from(new Set(vehicles.vehicles.map(vehicle => vehicle.manufacturer))).sort();
      setManufacturers(manufacturers);

      // Extract unique types, sort them alphabetically, and capitalize the first letter
      const types = Array.from(new Set(vehicles.vehicles.map(vehicle => vehicle.category)))
        .map(type => capitalizeFirstLetter(type))
        .sort();
      setTypes(types);

      // Extract unique transmissions and sort them alphabetically
      const transmissions = Array.from(new Set(vehicles.vehicles.map(vehicle => vehicle.transmission))).sort();
      setTransmissions(transmissions);

      setFilteredVehicles(vehicles.vehicles); // Initially show all vehicles
    };

    loadVehicles();
  }, []);

  useEffect(() => {
    let filtered = vehicles;

    if (selectedManufacturer) {
      filtered = filtered.filter(vehicle => vehicle.manufacturer === selectedManufacturer);
    }

    if (selectedType) {
      filtered = filtered.filter(vehicle => capitalizeFirstLetter(vehicle.category) === selectedType);
    }

    if (selectedTransmission) {
      filtered = filtered.filter(vehicle => vehicle.transmission === selectedTransmission);
    }

    setFilteredVehicles(filtered);
  }, [selectedManufacturer, selectedType, selectedTransmission, vehicles]);

  function selectCar(car: ICar) {
    if (!car.available) return;
    handleSetCar(car);
  }

  return (
    <div className="flex flex-col gap-8 flex-1 xl:mr-8" style={{ marginTop: "120px" }}>
      <h1 className="text-3xl font-bold text-white">
        Time to choose your car!
      </h1>
      <div className="flex space-x-4 py-2">
        <select
          className="p-2 rounded-md border border-gray-300"
          value={selectedManufacturer}
          onChange={(e) => setSelectedManufacturer(e.target.value)}
        >
          <option value="">All Manufacturers</option>
          {manufacturers.map(manufacturer => (
            <option key={manufacturer} value={manufacturer}>
              {manufacturer}
            </option>
          ))}
        </select>
        <select
          className="p-2 rounded-md border border-gray-300"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          className="p-2 rounded-md border border-gray-300"
          value={selectedTransmission}
          onChange={(e) => setSelectedTransmission(e.target.value)}
        >
          <option value="">All Transmissions</option>
          {transmissions.map(transmission => (
            <option key={transmission} value={transmission}>
              {capitalizeFirstLetter(transmission)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-8 grid-cols-2 xl:grid-cols-3">
        {filteredVehicles.map((car) => (
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
