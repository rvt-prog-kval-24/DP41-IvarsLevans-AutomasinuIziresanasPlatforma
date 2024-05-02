export interface ICar {
  id: string;
  kmpl: number;
  highway_kmpl: number;
  category: string;
  transmission: string;
  fuel_type: string;
  manufacturer: string;
  model: string;
  year: number;
  slug: string;
  rental_factor: number;
  rental_price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  rentals?: any[];
}
