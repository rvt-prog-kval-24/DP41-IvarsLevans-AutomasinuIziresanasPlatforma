"use client";
import RentCarPreviewer from "@/components/rent/rent-car-previewer";
import DealershipSelect from "@/components/rent/rent-dealership-select";
import RentDatePicker from "@/components/rent/rent-date-picker";
import RentHeader from "@/components/rent/rent-header";
import RentVehicles from "@/components/rent/rent-vehicles";
import { Button } from "@/components/ui/button";
import { useRent } from "@/context/rent-context";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { dayjs } from "@/lib/dayjs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const steps: {
  title: string;
  step: number;
}[] = [
  { title: "Date Selection", step: 1 },
  { title: "Vehicle Selection", step: 2 },
  { title: "Verification", step: 3 },
];

const Rent = ({ searchParams }: { searchParams: { step: string } }) => {
  const [currentStep, setCurrentStep] = useState(
    () => Number(searchParams.step) || 1
  );

  const { car, startDate, finishDate, dealership, clearRent } = useRent(); 
  const router = useRouter();
  const { data: session } = useSession();

  function handleChangeStep(step: number) {
    if (step === 2 && (!startDate || !finishDate)) return;
    if (step === 3 && (!car || !startDate || !finishDate)) return;
    if (step === 3 && !session) {
      return router.replace("/login?referer=rent?step=3");
    }
    setCurrentStep(step);

    const newPathName = updateSearchParams(step);
    router.push(newPathName, { scroll: false });
  }

  function updateSearchParams(step: number) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("step", step.toString());
    return `${window.location.pathname}?${searchParams.toString()}`;
  }

  function handleIncrementStep() {
    if (currentStep === 3) return;

    handleChangeStep(currentStep + 1);
  }

  async function handleCreateRent() {
    const response = await fetch("/api/rent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        car,
        userEmail: session?.user?.email,
        startDate,
        finishDate,
        dealership,
      }),
    });

    if (response.ok) {
      toast.success('Booking created successfully!');
      router.push("/account/history");
      clearRent();
    } else {
      toast.error('Failed to create booking!');
    }
  }

  return (
    <section className="relative">
      <ToastContainer />
      <RentHeader
        steps={steps}
        currentStep={currentStep}
        handleChangeStep={handleChangeStep}
      />

      <div className="container mx-auto px-6 py-24 flex flex-col-reverse gap-8 xl:flex-row justify-between">
        {currentStep === 1 && (
          <div className="">
            <DealershipSelect /> {/* Include DealershipSelect component */}
            <RentDatePicker handleIncrementStep={handleIncrementStep} />
          </div>
        )}
        {currentStep === 2 && <RentVehicles />}

        {(currentStep === 1 || currentStep === 2) && (
          <div
            className="flex flex-col gap-8 w-full xl:w-96 h-fit p-8 rounded-lg"
            style={{
              marginTop: "150px",
              backgroundColor: car ? "white" : "black",
              border: car ? "1px solid #ccc" : "none",
            }}
          >
            {car ? (
              <>
                <RentCarPreviewer />
                {currentStep === 2 && (
                  <Button onClick={handleIncrementStep}>
                    Book Vehicle
                  </Button>
                )}
              </>
            ) : null}
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col w-full md:flex-row gap-8" style={{ marginTop: "90px" }}>
            <div className="flex flex-col flex-1 border rounded-lg p-8 gap-4">
              <h1 className="text-3xl font-bold text-white">
                Booking summary
              </h1>
              <div className="text-white text-xl flex flex-col gap-1">
                <span className="font-bold">Name of Client: </span>
                {session?.user?.name}
              </div>
              <div className="text-white text-xl flex flex-col gap-1">
                <span className="font-bold">Pick up date and time: </span>
                {dayjs(startDate).format("LLL")}
              </div>
              <div className="text-white text-xl flex flex-col gap-1">
                <span className="font-bold">Drop off date and time: </span>
                {dayjs(finishDate).format("LLL")}
              </div>
              <div className="text-white text-xl flex flex-col gap-1">
                <span className="font-bold">Total price: </span>
                €{" "}
                {(
                  car?.rental_price! *
                  (dayjs(finishDate).diff(startDate, "day") + 1)
                ).toFixed(2)}
              </div>
              {/* Display  address */}
              <div className="text-white text-xl flex flex-col gap-1">
                <span className="font-bold">Pick Up & Drop Off Address: </span>
                {dealership?.address}
              </div>
              <Button
                onClick={handleCreateRent}
                className="hidden lg:inline-flex text-lg"
              >
                Book
              </Button>
            </div>
            <div className="flex flex-1 sm:flex-col border p-8 rounded-lg items-center sm:items-start">
              <div className="space-y-1 flex-1 sm:flex-none">
                <h1 className="text-white text-xl font-bold ">
                  <span className="font-normal">{car?.manufacturer} </span>
                  {car?.model}
                </h1>
                <h3 className="text-white text-foreground/50">{car?.year}</h3>
              </div>
              <div className="relative aspect-video w-9/12">
                <Image
                  src={`/cars/${car?.slug}.png`}
                  alt={`${car?.model}`}
                  className="object-contain"
                  fill
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                    Details:
                </h3>
                <h3 className="text-white text-xl flex flex-col gap-1" style={{ margin: "0.2em 0" }}>
                    {car?.category && car.category.charAt(0).toUpperCase() + car.category.slice(1)}
                </h3>
                <h3 className="text-white text-xl flex flex-col gap-1" style={{ margin: "0.2em 0" }}>
                    {car?.transmission && car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}
                </h3>
                <h3 className="text-white text-xl flex flex-col gap-1" style={{ margin: "0.2em 0" }}>
                    Highway kmpl: {car?.highway_kmpl}
                </h3>
                <h3 className="text-white text-xl flex flex-col gap-1" style={{ margin: "0.2em 0" }}>
                    Kmpl: {car?.kmpl}
                </h3>
              </div>
              <Button
                onClick={handleCreateRent}
                className="hidden md:inline-flex lg:hidden w-full mt-auto text-lg"
              >
                Book
              </Button>
            </div>
            <Button onClick={handleCreateRent} className="md:hidden text-lg">
              Book
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rent;