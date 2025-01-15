import { Rent } from "@/types";

export type GetRentByIdResponse = {
  item: Rent;
  message: string;
};

export type GetAllRentsResponse = {
  items: Rent[];
  count: number;
  skip: number;
  take: number;
  message: string;
};

export type RentPayload = {
  title: string;
  description: string;
  price: number;
  discountPrice: number | null;
  category: string;
  fuel: number;
  gear: string;
  pickUpLocations: string[];
  dropOffLocations: string[];
  capacity: number;
  showInRecommendation: boolean;
  images: File[] | null;
};

export type RentResponse = {
  item?: Rent;
  message: string;
};

export type GetAllRentPayload = {
  skip?: number;
  take?: number;
  search?: string | null;
  dropOffLocation?: string | null;
  pickUpLocation?: string | null;
  categories?: string[];
  capacities?: string[];
  maxPrice?: string | null;
  minPrice?: string | null;
  showInRecommendation?: boolean;
};
