import React, { useEffect, useState } from 'react';
import { fetchRentsByUser } from "@/lib/utils";
import { IRental } from "@/types/rental";
import { dayjs } from "@/lib/dayjs";
import { Badge } from "../ui/badge";
import Image from "next/image";

interface UserRentalProps {
  email: string | null; // Allow the email prop to be nullable
}

const UserRentals = ({ email }: UserRentalProps) => {
  const [rentals, setRentals] = useState<Array<IRental>>([]);

  useEffect(() => {
    // Fetch rentals only if the email prop is not null
    if (email) {
      fetchRentsByUser(email).then((res) => {
        setRentals(res.rentals);
      });
    } else {
      // If email is null, clear the rentals
      setRentals([]);
    }
  }, [email]); // Update the rentals whenever the email prop changes

  return (
    <div className="grid grid-cols-2 gap-8">
      {rentals.map((rental) => (
        <div
          key={rental.id}
          className="flex flex-row border p-8 rounded-lg"
        >
          <div className="space-y-4 flex-1">
            <Badge className={rental.ongoing ? "bg-green-300" : "bg-primary"}>
              {rental.ongoing ? "In progress" : "Not in progress"}
            </Badge>
            {/* Display address */}
            <h1 className="text-white font-bold flex flex-col text-lg">
              Pick Up & Drop Off Address:{" "}
              <span className="font-normal">
                {rental.dealership?.address}
              </span>
            </h1>
            <h1 className="text-white font-bold flex flex-col text-lg">
              Pick up date:{" "}
              <span className="font-normal">
                {dayjs(rental.startDate).format("LLL")}
              </span>
            </h1>
            <h1 className="text-white font-bold flex flex-col text-lg">
              Drop off date:{" "}
              <span className="font-normal">
                {dayjs(rental.endDate).format("LLL")}
              </span>
            </h1>
            <h1 className="text-white font-bold flex flex-col text-lg">
              Total price:{" "}
              <span className="font-normal">
                € {rental.totalPrice.toFixed(2)}
              </span>
            </h1>
          </div>
          <div className="flex flex-col justify-center">
            <div className="space-y-2">
              {/* Increased font size for manufacturer, model, and year */}
              <h1 className="text-white text-2xl font-bold">
                <span className="font-normal">{rental.car.manufacturer} </span>
                {rental.car.model}
              </h1>
              <h3 className="text-white text-lg">{rental.car.year}</h3>
            </div>
            <div className="relative w-60 h-40"> {/* Adjusted dimensions for image container */}
              {/* Increased image size */}
              <Image
                src={`/cars/${rental.car.slug}.png`}
                alt={`${rental.car.model}`}
                className="object-contain"
                layout="fill"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserRentals;
