import { AxiosError } from "axios";

export type User = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  isBlocked: boolean;
  createdAt: string;
  role: UserRole;
};

export type Location = {
  _id: string;
  createdAt: string;
  title: string;
};

export type Category = {
  _id: string;
  createdAt: string;
  title: string;
  rents: Rent[] | string[];
};

export type Rent = {
  _id: string;
  title: string;
  fuel: number;
  gear: string;
  price: number;
  description: string;
  capacity: number;
  createdAt: string;
  currency: string;
  discountPrice: number | null;
  category: Category;
  dropOffLocations: Location[];
  imageUrls: string[];
  pickUpLocations: Location[];
  showInRecommendation: boolean;
  reviews: Review[];
};

export type Reservation = {
  billing: {
    name: string;
    phoneNumber: string;
    address: string;
    city: string;
  };
  createdAt: string;
  dropOffLocation: string;
  dropOffDate: string;
  pickUpLocation: string;
  pickUpDate: string;
  rent: Rent | string;
  total: number;
  updatedAt: string;
  user: string;
  _id: string;
  status: ReservationStatus;
  hasReview: boolean;
};

export type Review = {
  author: User;
  content: string;
  createdAt: string;
  id: string;
  rate: number;
  rent: Rent;
  status: ReviewStatus;
  _id: string;
};

export type Conversation = {
  _id: string;
  userName: string;
  userEmail: string;
  userId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  _id: string;
  text: string;
  userId: string;
  userName: string;
  conversation: string | Conversation;
  createdAt: string;
  updatedAt: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export enum ReservationStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  Cancelled = "Cancelled",
}

export enum ReviewStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export type AxiosResponseError = AxiosError<{
  message: string;
}>;
