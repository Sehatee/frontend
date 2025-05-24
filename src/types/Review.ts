import { User } from "./User";

export type Review = {
  _id: string;
  content: string;
  doctorId: string;
  patientId: User;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
export type CreateReview = {
  content: string;
  rating: number;
};
export type UpdateReview = {
  content?: string;
  rating?: number;
};
