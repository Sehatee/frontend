export type Review = {
  _id: string;
  content: string;
  patientId: User;
  doctorId: User;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
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
    day:
      | "Sunday"
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday";
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
    day:
      | "Sunday"
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday";
  }[];
  location?: {
    type: "Point";
    coordinates: number[];
    addrss?: string;
  };
  description?: string;
};
