export type applyAppintment = {
  doctorId: string;
  date: string;
  notes: string;
};
export type Appointment = {
  _id: string;
  patientId: string;
  doctorId: string;
  date: string;
  notes: string;
  status: string;
  createdAt: string;
};
