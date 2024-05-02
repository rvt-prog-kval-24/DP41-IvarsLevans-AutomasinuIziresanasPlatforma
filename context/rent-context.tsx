"use client";
import { ICar } from "@/types/car";
import { dayjs } from "@/lib/dayjs";
import { ReactNode, createContext, useContext, useState } from "react";

interface RentContextType {
  car: ICar | null;
  handleSetCar(car: ICar): void;
  startDate: Date | undefined;
  startTime: string | undefined;
  finishDate: Date | undefined;
  finishTime: string | undefined;
  handleSetStartDate(date: Date | undefined): void;
  handleSetStartTime(time: string): void;
  handleSetFinishDate(date: Date | undefined): void;
  handleSetFinishTime(time: string): void;
  clearRent(): void;
}

export const RentContext = createContext<RentContextType>({
  car: null,
  handleSetCar: (): void => {},
  startDate: undefined,
  startTime: undefined,
  finishDate: undefined,
  finishTime: undefined,
  handleSetStartDate: (): void => {},
  handleSetStartTime: (): void => {},
  handleSetFinishDate: (): void => {},
  handleSetFinishTime: (): void => {},
  clearRent: (): void => {},
});

interface RentProviderProps {
  children: ReactNode;
}

export function useRent() {
  const value = useContext(RentContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useRent must be wrapped in a <RentProvider />");
    }
  }
  return value;
}

export default function RentProvider({ children }: RentProviderProps) {
  const [car, setCar] = useState<ICar | null>(null);

  const [startDate, setStartDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>();
  const [finishDate, setFinishDate] = useState<Date>();
  const [finishTime, setFinishTime] = useState<string>();

  function handleSetStartDate(date: Date | undefined) {
    if (date) setStartDate(date);
  }

  function handleSetStartTime(time: string) {
    setStartTime(time);
    const [hour, minute] = time.split(":");
    handleSetStartDate(
      dayjs(startDate).hour(Number(hour)).minute(Number(minute)).toDate()
    );
  }

  function handleSetFinishDate(date: Date | undefined) {
    if (date) setFinishDate(date);
  }

  function handleSetFinishTime(time: string) {
    setFinishTime(time);
    const [hour, minute] = time.split(":");
    handleSetFinishDate(
      dayjs(finishDate).hour(Number(hour)).minute(Number(minute)).toDate()
    );
  }

  function handleSetCar(car: ICar) {
    setCar(car);
  }

  function clearRent() {
    setCar(null);
    setStartDate(undefined);
    setStartTime(undefined);
    setFinishDate(undefined);
    setFinishTime(undefined);
  }

  return (
    <RentContext.Provider
      value={{
        car,
        handleSetCar,
        startDate,
        startTime,
        handleSetStartDate,
        handleSetStartTime,
        finishDate,
        finishTime,
        handleSetFinishDate,
        handleSetFinishTime,
        clearRent,
      }}
    >
      {children}
    </RentContext.Provider>
  );
}
