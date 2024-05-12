import { ICar } from "./car";
import { IDealership } from "./dealership";

export interface IRental {
  id: string;
  userId: string;
  carId: string;
  dealershipID: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  dealershipId: string;
  dealership: IDealership;
  car: ICar;
}
