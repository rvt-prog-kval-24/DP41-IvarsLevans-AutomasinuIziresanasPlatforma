"use client";
import React, { useState, useEffect } from "react";
import VehicleCard from "./vehicle-card";
import { ICar } from "@/types/car";

const fetchVehicles = async (): Promise<ICar[]> => {
  const response = await fetch("/api/vehicles");
  const data = await response.json();
  return data.vehicles;
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<ICar[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<ICar[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    const loadVehicles = async () => {
      const vehicles = await fetchVehicles();
      setVehicles(vehicles);

      // Extract unique manufacturers and sort them alphabetically
      const manufacturers = Array.from(new Set(vehicles.map(vehicle => vehicle.manufacturer))).sort();
      setManufacturers(manufacturers);

      // Extract unique types, sort them alphabetically, and capitalize the first letter
      const types = Array.from(new Set(vehicles.map(vehicle => vehicle.category)))
        .map(type => capitalizeFirstLetter(type))
        .sort();
      setTypes(types);

      setFilteredVehicles(vehicles); // Initially show all vehicles
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

    setFilteredVehicles(filtered);
  }, [selectedManufacturer, selectedType, vehicles]);

  return (
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
      <div className="flex space-x-4 py-8">
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
      </div>
      <div className="grid gap-8 py-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {filteredVehicles.map(car => (
          <VehicleCard car={car} key={car.id} />
        ))}
      </div>
    </section>
  );
};

export default Vehicles;