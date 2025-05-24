import { User } from "./User";

export type MedicalRecordPateint = {
  _id: string;
  patientId: string;
  doctorId: User;
  diagnosis: string;
  treatment: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
};
export type MedicalRecordDoctor = {
  _id: string;
  patientId: User;
  doctorId: string;
  diagnosis: string;
  treatment: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreateMedicalRecord = {
  patientId: string;
  diagnosis: string;
  treatment: string;
  files: Buffer[] | null;
};
export type UpdateMedicalRecord = {
  diagnosis?: string;
  treatment?: string;
};
