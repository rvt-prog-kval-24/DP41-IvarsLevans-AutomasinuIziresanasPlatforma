import React, { useEffect, useState } from 'react';
import { fetchRentsByUser } from "@/lib/utils";
import { IRental } from "@/types/rental";
import { dayjs } from "@/lib/dayjs";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserRentalProps {
  email: string | null; // Allow the email prop to be nullable
}

const UserRentals = ({ email }: UserRentalProps) => {
  const { data: session } = useSession();
  const [rentals, setRentals] = useState<Array<IRental>>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Fetch rentals only if the email prop is not null
    if (email) {
      fetchRentsByUser(email).then((res) => {
        setRentals(res.rentals || []); // Ensure res.rentals is defined
      });
    } else {
      // If email is null, clear the rentals
      setRentals([]);
    }
  }, [email]); // Update the rentals whenever the email prop changes

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/admin/users`);
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          const user = data.users.find((user: { email: string; admin: boolean }) => user.email === session.user?.email);
          if (user && user.admin) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  const handleToggleBooking = async (rentalId: string) => {
    try {
      const response = await fetch('/api/rent/toggle', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rentalId }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle booking!');
      }

      const data = await response.json();
      toast.success('Booking toggled successfully!');

      // Update the rental list with the updated rental
      setRentals((prevRentals) =>
        prevRentals.map((rental) =>
          rental.id === rentalId ? { ...rental, ongoing: !rental.ongoing } : rental
        )
      );
    } catch (error) {
      toast.error('Error toggling booking!');
      console.error('Error toggling booking:', error);
    }
  };

  const handleDeleteBooking = async (rentalId: string, ongoing: boolean) => {
    if (ongoing) {
      toast.error('Cannot delete a booking in progress!');
      return;
    }

    try {
      const response = await fetch('/api/rent', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rentalId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      const data = await response.json();
      toast.success('Booking deleted successfully!');

      // Update the rental list after deletion
      setRentals((prevRentals) =>
        prevRentals.filter((rental) => rental.id !== rentalId)
      );
    } catch (error) {
      toast.error('Error deleting booking!');
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {rentals.map((rental) => (
        <div
          key={rental.id}
          className="relative flex flex-row border p-8 rounded-lg"
        >
          <div className="absolute top-2 right-2">
            <button
              className="text-white border-white border-2 rounded-full p-1 w-8 h-8 flex items-center justify-center"
              onClick={() => handleDeleteBooking(rental.id, rental.ongoing)}
            >
              &times;
            </button>
          </div>
          <div className="space-y-4 flex-1">
            <Badge className={rental.ongoing ? "bg-green-500" : "bg-primary"}>
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
          <div className="flex flex-col justify-center relative">
            <div className="space-y-2">
              {/* Increased font size for manufacturer, model, and year */}
              <h1 className="text-white text-2xl font-bold">
                <span className="font-normal">{rental.car.manufacturer} </span>
                {rental.car.model}
              </h1>
              <h3 className="text-white text-lg">{rental.car.year}</h3>
            </div>
            <div className="relative w-60 h-40">
              <Image
                src={`/cars/${rental.car.slug}.png`}
                alt={`${rental.car.model}`}
                className="object-contain"
                layout="fill"
              />
            </div>
            {/* Toggle Booking Button */}
            {isAdmin && (
              <button
                className="bg-primary text-white px-4 py-1 rounded-md mt-4"
                onClick={() => handleToggleBooking(rental.id)}
              >
                Toggle Booking
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserRentals;