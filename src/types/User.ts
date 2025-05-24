import { Review } from "./Review";

export type User = {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "doctor" | "patient";
  phone?: string;
  picture?: string;
  specialization?: string;
  appointments?: {
    doctorId: string;
    patientId: string;
    date: string;
  }[];
  avgRatings: number;
  availableHours?: {
    day: string;
  }[];
  location?: {
    type: "Point";
    coordinates: number[];
    addrss?: string;
  };
  active: boolean;
  description: string;
  createdAt: Date;
  reviews: Review[];
};
export type updateUser = {
  username?: string;
  email?: string;
  phone?: string;
  specialization?: string;
  availableHours?: {
    day: string;
  }[];
  location?: {
    type: "Point";
    coordinates: number[];
    addrss?: string;
  };
  description?: string;
};
export type CreateUser = {
  username?: string;
  email?: string;
  phone?: string;
  role: "admin" | "doctor" | "patient";
  active: boolean;
  picture: string;
  specialization?: string;
  availableHours?: {
    day: string;
  }[];
  location?: {
    type: "Point";
    coordinates: number[];
    addrss?: string;
  };
  description?: string;
  password: string;
  confirmPassword: string;
};
