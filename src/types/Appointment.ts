import { User } from "./User";

export type applyAppintment = {
  doctorId: string;
  date: string;
  notes: string;
};
export type Appointment = {
  _id: string;
  patientId: User;
  doctorId: string;
  date: string;
  notes: string;
  status: string;
  createdAt: string;
};
