import { User } from "@/types/User";
import showToast from "@/utils/showToast";
import axios, { AxiosError } from "axios";
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
export const createUser = async (data: FormData, token: string) => {
  try {
    const res = await axios.post(`${baseUrl}/users/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    showToast("success", "created a user ");
    return res.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "An error occurred"
    );
    return axiosError.response?.data;
  }
};
export const activeOrDeleteUser = async (
  id: string,
  active: boolean,
  token: string
) => {
  try {
    const res = await axios.patch(
      `${baseUrl}/users/${id}`,
      {
        active: !active,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    showToast("success", `${!active ? "active a user" : "delete a user"}`);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "An error occurred"
    );
    return axiosError.response?.data;
  }
};
