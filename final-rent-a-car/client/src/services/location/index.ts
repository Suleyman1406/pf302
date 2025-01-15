import axiosInstance from "../axiosInstance";
import { GetAllLocationsResponse } from "./types";

async function getAll() {
  return await axiosInstance.get<GetAllLocationsResponse>("/locations");
}

const locationService = {
  getAll,
};

export default locationService;
