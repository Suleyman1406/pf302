import axiosInstance from "../axiosInstance";
import { GetAllCategoriesResponse } from "./types";

async function getAll() {
  return await axiosInstance.get<GetAllCategoriesResponse>("/categories");
}

const categoryService = {
  getAll,
};

export default categoryService;
