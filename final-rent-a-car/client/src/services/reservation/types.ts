import { Reservation, ReservationStatus } from "@/types";

export type CreateReservationPayload = {
  rent: string;
  pickUpDate: string;
  dropOffDate: string;
  billing: {
    name: string;
    phoneNumber: string;
    address: string;
    city: string;
  };
  dropOffLocation: string;
  pickUpLocation: string;
};

export type GetAllReservationsResponse = {
  items: Reservation[];
  message: string;
};

export type ChangeReservationStatusPayload = {
  status: ReservationStatus;
};
