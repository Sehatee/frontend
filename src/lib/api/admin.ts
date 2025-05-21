import { User } from "@/types/User";
import { AxiosError } from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const getAnalysis = async (token: string) => {
  try {
    //appointments
    const resAppointments = await fetch(`${baseUrl}/appointments/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataAppointments = await resAppointments.json();
    //doctors
    const resDoctors = await fetch(`${baseUrl}/doctors`);
    const dataDoctors = await resDoctors.json();
    //users
    const res = await fetch(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const data = await res.json();
    
    const usersBlock = data.data.users.filter((user: User) => !user.active);
    return {
      users: data.data,
      doctors: dataDoctors,
      appointments: dataAppointments.data,
      usersBlock,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(error);
    console.log(axiosError.response?.data);

    return null;
  }
};
