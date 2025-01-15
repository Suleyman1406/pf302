import axiosInstance from "../axiosInstance";
import {
  ChangeReservationStatusPayload,
  CreateReservationPayload,
  GetAllReservationsResponse,
} from "./types";

async function getAll() {
  return await axiosInstance.get<GetAllReservationsResponse>(`/reservations`);
}

async function changeStatus({
  id,
  data,
}: {
  id: string;
  data: ChangeReservationStatusPayload;
}) {
  return await axiosInstance.put(`/reservations/change-status/${id}`, data);
}

async function create(data: CreateReservationPayload) {
  return await axiosInstance.post("/reservations", data);
}

const reservationService = {
  create,
  getAll,
  changeStatus,
};

export default reservationService;
