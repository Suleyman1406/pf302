import { User } from "@/types";

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  username: string;
};

export type RegisterResponse = {
  message: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  user?: User;
};

export type GetCurrentUser = {
  user: User;
};
