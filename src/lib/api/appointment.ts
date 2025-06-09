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
    showToast("success", "تم تقديم الموعد بنجاح");
   
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(error);
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "حدث خطأ"
    );
    return null;
  }
};
export const getAllAppintmentsByPatient = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/appointments/patient`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.data.appointments;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "حدث خطأ"
    );
    return null;
  }
};
export const getAllAppintmentsByDoctor = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.data.appointments;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "حدث خطأ"
    );
    return null;
  }
};
export const deleteAppointment = async (
  appointmentId: string,
  token: string
) => {
  try {
    await axios.delete(`${baseUrl}/appointments/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    showToast("success", "تم حذف الموعد بنجاح");
    return;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "حدث خطأ"
    );
    return null;
  }
};
