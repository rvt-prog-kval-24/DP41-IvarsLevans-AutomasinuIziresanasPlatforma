'use client'
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { useRent } from "@/context/rent-context";
import { IDealership } from "@/types/dealership";

const DealershipSelect = () => {
  const { handleSetDealership } = useRent(); // Destructure handleSetDealership from the rental context
  const [dealerships, setDealerships] = useState<IDealership[]>([]); // State to store fetched dealerships

  useEffect(() => {
    fetch("/api/dealerships")
      .then((response) => response.json())
      .then((data) => {
        setDealerships(data.dealerships); // Set fetched dealerships in state
      })
      .catch((error) => {
        console.error("Error fetching dealerships:", error);
      });
  }, []);

  // Function to handle dealership selection
  const handleDealershipSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDealership = dealerships.find((dealer) => dealer.id === event.target.value);
    if (selectedDealership) {
      handleSetDealership(selectedDealership); // Set selected dealership in rental context
    }
  };

  return (
    <div className="space-y-8 flex-1" style={{ marginTop: "120px" }}>
      <h1 className="text-3xl font-bold text-white">
        Select the pick up and drop off location
      </h1>
      <div className="flex p-8 flex-col xl:flex-row gap-8 border rounded-lg bg-white">
        <div className="flex justify-between gap-4 xl:gap-8 flex-col md:flex-row flex-1">
          <div className="flex flex-col gap-4 w-full md:w-[48%]">
            <Label>Vehicle Location</Label>
            <div className="flex flex-wrap lg:flex-nowrap gap-2 sm:border sm:rounded-lg">
              <select onChange={handleDealershipSelect}>
                <option value="">Select a location</option>
                {dealerships.map((dealership) => (
                  <option key={dealership.id} value={dealership.id}>
                    {dealership.country} - {dealership.city}, {dealership.address}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealershipSelect;