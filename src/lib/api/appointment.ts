import { applyAppintment } from "@/types/Appointment";
import showToast from "@/utils/showToast";
import axios, { AxiosError } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const applyAppointment = async (
  data: applyAppintment,
  token: string | undefined
) => {
  try {
    const res = await axios.post(`${baseUrl}/appointments`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    showToast("success", "Appointment applied successfully");
    console.log(res);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(error);
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "An error occurred"
    );
    return null;
  }
};
export const getAllAppintmentsByPatient = async () => {
  try {
    const res = await fetch(`${baseUrl}/apoointments`);
    const data = await res.json();
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "An error occurred"
    );
    return null;
  }
};
