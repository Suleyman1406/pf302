import axiosInstance from "../axiosInstance";
import {
  RentPayload,
  RentResponse,
  GetAllRentsResponse,
  GetRentByIdResponse,
  GetAllRentPayload,
} from "./types";

async function getAll(data: GetAllRentPayload = {}) {
  const params = new URLSearchParams();
  if (data.skip) params.append("skip", data.skip.toString());
  if (data.take) params.append("take", data.take.toString());
  if (data.search) params.append("search", data.search);
  if (data.dropOffLocation)
    params.append("dropOffLocation", data.dropOffLocation);
  if (data.pickUpLocation) params.append("pickUpLocation", data.pickUpLocation);
  if (data.categories)
    data.categories.forEach((category, index) => {
      params.append(`categories[${index}]`, category);
    });
  if (data.capacities)
    data.capacities.forEach((capacity, index) => {
      params.append(`capacities[${index}]`, capacity);
    });
  if (data.maxPrice) params.append("maxPrice", data.maxPrice);
  if (data.minPrice) params.append("minPrice", data.minPrice);
  if (data.showInRecommendation)
    params.append("showInRecommendation", data.showInRecommendation.toString());

  return await axiosInstance.get<GetAllRentsResponse>(
    `/rents?${params.toString()}`
  );
}

async function getById({ id }: { id: string }) {
  return await axiosInstance.get<GetRentByIdResponse>(`/rents/${id}`);
}

async function create(data: RentPayload) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  if (data.discountPrice)
    formData.append("discountPrice", data.discountPrice.toString());
  formData.append("category", data.category);
  formData.append("fuel", data.fuel.toString());
  formData.append("gear", data.gear);
  data.pickUpLocations.forEach((location, index) => {
    formData.append(`pickUpLocations[${index}]`, location);
  });
  data.dropOffLocations.forEach((location, index) => {
    formData.append(`dropOffLocations[${index}]`, location);
  });
  formData.append("capacity", data.capacity.toString());
  formData.append("showInRecommendation", data.showInRecommendation.toString());
  if (data.images) {
    data.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  return await axiosInstance.post<RentResponse>("/rents", formData);
}
async function edit({ id, data }: { id: string; data: RentPayload }) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  if (data.discountPrice)
    formData.append("discountPrice", data.discountPrice.toString());
  formData.append("category", data.category);
  formData.append("fuel", data.fuel.toString());
  formData.append("gear", data.gear);
  data.pickUpLocations.forEach((location, index) => {
    formData.append(`pickUpLocations[${index}]`, location);
  });
  data.dropOffLocations.forEach((location, index) => {
    formData.append(`dropOffLocations[${index}]`, location);
  });
  formData.append("capacity", data.capacity.toString());
  formData.append("showInRecommendation", data.showInRecommendation.toString());
  if (data.images) {
    Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });
  }

  return await axiosInstance.put<RentResponse>(`/rents/${id}`, formData);
}

const rentService = {
  edit,
  getAll,
  create,
  getById,
};

export default rentService;
