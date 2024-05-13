'use client';
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { useRent } from "@/context/rent-context";
import { IDealership } from "@/types/dealership";
import { Button } from "../ui/button";

const DealershipSelect = () => {
  const { handleSetDealership } = useRent();
  const [dealerships, setDealerships] = useState<IDealership[]>([]);

  useEffect(() => {
    fetch("/api/dealerships")
      .then((response) => response.json())
      .then((data) => {
        setDealerships(data.dealerships);
      })
      .catch((error) => {
        console.error("Error fetching dealerships:", error);
      });
  }, []);

  const handleDealershipSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDealership = dealerships.find((dealer) => dealer.id === event.target.value);
    if (selectedDealership) {
      handleSetDealership(selectedDealership);
    }
  };

  return (
    <div className="space-y-2 flex-1" style={{ marginTop: "150px" }}>
      <h1 className="text-3xl font-bold text-white">
        Select the pick up and drop off location
      </h1>
      <div className="flex p-8 flex-col xl:flex-row gap-8 border rounded-lg bg-white">
        <div className="flex justify-between gap-4 xl:gap-8 flex-col md:flex-row flex-1">
          <div className="flex flex-col gap-4 w-full md:w-[100%]">
            <Label>Vehicle Location</Label>
            <div className="flex flex-wrap lg:flex-nowrap gap-2 sm:border sm:rounded-lg relative">
              <select onChange={handleDealershipSelect} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Select a location</option>
                {dealerships.map((dealership) => (
                  <option key={dealership.id} value={dealership.id}>
                    {dealership.country} - {dealership.city}, {dealership.address}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 8l4 4 4-4z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealershipSelect;