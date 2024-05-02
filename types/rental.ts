import { ICar } from "./car";

export interface IRental {
  id: string;
  userId: string;
  carId: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  car: ICar;
}
