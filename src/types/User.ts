export type User = {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "doctor" | "patient";
  phone?: string;
  picture?: string;
  specialization?: string;
  appointments?: string[];
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
};
