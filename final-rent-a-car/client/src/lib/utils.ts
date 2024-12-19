import { User } from "@/types";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function formatDate(date: string, format = "DD/MM/YYYY") {
  return moment(date).format(format);
}
export function calculateDateDifference(
  startDate: Date | string,
  endDate: Date | string
) {
  const start = moment(startDate);
  const end = moment(endDate);
  return end.diff(start, "days");
}

export function getUserId(user?: User | null) {
  if (user) return user._id;
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = Math.random().toString(36).substring(7);
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
}
